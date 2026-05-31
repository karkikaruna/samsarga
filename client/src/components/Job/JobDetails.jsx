import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";
import {
  FiMapPin, FiBriefcase, FiDollarSign,
  FiCalendar, FiTag, FiArrowLeft,
} from "react-icons/fi";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
      .then((res) => { setJob(res.data.job); setLoading(false); })
      .catch(() => { navigate("/notfound"); });
  }, [id]);

  if (!isAuthorized) { navigate("/login"); return null; }

  const salary = job?.fixedSalary
    ? `$${Number(job.fixedSalary).toLocaleString()}`
    : job?.salaryFrom
    ? `$${Number(job.salaryFrom).toLocaleString()} – $${Number(job.salaryTo).toLocaleString()}`
    : "Not specified";

  const meta = [
    { icon: <FiTag />,      label: "Category", value: job?.category },
    { icon: <FiMapPin />,   label: "Location",  value: job ? `${job.city}, ${job.country}` : "" },
    { icon: <FiMapPin />,   label: "Address",   value: job?.location },
    { icon: <FiDollarSign />,label: "Salary",   value: salary },
    { icon: <FiCalendar />, label: "Posted On", value: job?.jobPostedOn ? new Date(job.jobPostedOn).toLocaleDateString() : "" },
  ];

  return (
    <main className="flex-1 bg-fb-surface py-8">
      <div className="max-w-3xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-fb-primary text-sm font-medium mb-5 hover:underline"
        >
          <FiArrowLeft /> Back to Jobs
        </button>

        {loading ? (
          <div className="fb-card p-8 animate-pulse space-y-4">
            <div className="h-6 bg-fb-surface rounded w-2/3" />
            <div className="h-4 bg-fb-surface rounded w-1/3" />
            <div className="h-32 bg-fb-surface rounded" />
          </div>
        ) : (
          <div className="fb-card overflow-hidden">
            {/* Header */}
            <div className="bg-fb-primary px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <FiBriefcase className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-white font-bold text-xl">{job.title}</h1>
                  <span className="text-blue-100 text-sm">{job.category}</span>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="p-6 grid grid-cols-2 gap-4 border-b border-fb-border">
              {meta.filter(m => m.value).map((m, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-fb-primary mt-0.5 flex-shrink-0">{m.icon}</span>
                  <div>
                    <p className="text-xs text-fb-muted font-semibold uppercase tracking-wide">{m.label}</p>
                    <p className="text-fb-text text-sm font-medium">{m.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="p-6">
              <h2 className="text-fb-text font-bold text-base mb-3">Job Description</h2>
              <p className="text-fb-muted text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>

            {/* CTA */}
            {user?.role !== "Employer" && (
              <div className="px-6 pb-6">
                <Link to={`/application/${job._id}`} className="btn-primary inline-block px-8 py-3 text-base">
                  Apply Now
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default JobDetails;
