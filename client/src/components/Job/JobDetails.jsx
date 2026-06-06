import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";
import {
  FaBriefcase, FaTag, FaMapMarkerAlt, FaCity,
  FaLocationArrow, FaCalendarAlt, FaMoneyBillWave,
} from "react-icons/fa";

const Detail = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 py-3 border-b border-[#f0f2f5] last:border-0">
    <span className="text-[#1877F2] mt-0.5 flex-shrink-0">{icon}</span>
    <div>
      <p className="text-xs font-semibold text-[#65676B] uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm text-[#050505] font-medium">{value}</p>
    </div>
  </div>
);

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
      .then((res) => setJob(res.data.job))
      .catch(() => navigateTo("/notfound"));
  }, []);

  if (!isAuthorized) { navigateTo("/login"); return null; }

  return (
    <div className="min-h-screen bg-[#f0f2f5] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-[#CED0D4] overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-[#1877F2] px-6 py-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FaBriefcase />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-100">Job Details</span>
            </div>
            <h1 className="text-xl font-bold">{job.title || "Loading..."}</h1>
            {job.category && (
              <span className="inline-block mt-2 bg-white/20 text-xs font-medium px-3 py-1 rounded-full">
                {job.category}
              </span>
            )}
          </div>

        
          <div className="px-6 py-2">
            <Detail icon={<FaTag />}          label="Category"    value={job.category || "—"} />
            <Detail icon={<FaMapMarkerAlt />} label="Country"     value={job.country || "—"} />
            <Detail icon={<FaCity />}         label="City"        value={job.city || "—"} />
            <Detail icon={<FaLocationArrow />}label="Location"    value={job.location || "—"} />
            <Detail icon={<FaCalendarAlt />}  label="Posted On"   value={job.jobPostedOn ? new Date(job.jobPostedOn).toLocaleDateString() : "—"} />
            <Detail
              icon={<FaMoneyBillWave />}
              label="Salary"
              value={
                job.fixedSalary
                  ? `$${Number(job.fixedSalary).toLocaleString()}`
                  : job.salaryFrom && job.salaryTo
                  ? `$${Number(job.salaryFrom).toLocaleString()} – $${Number(job.salaryTo).toLocaleString()}`
                  : "—"
              }
            />
          </div>

          
          {job.description && (
            <div className="px-6 pb-4">
              <p className="text-xs font-semibold text-[#65676B] uppercase tracking-wide mb-2">Description</p>
              <p className="text-sm text-[#050505] leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>
          )}

          {user?.role !== "Employer" && (
            <div className="px-6 py-5 bg-[#f0f2f5] border-t border-[#CED0D4]">
              <Link
                to={`/application/${job._id}`}
                className="inline-block bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
