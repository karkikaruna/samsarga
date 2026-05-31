import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { FiMapPin, FiBriefcase, FiArrowRight } from "react-icons/fi";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/job/getall", { withCredentials: true })
      .then((res) => { setJobs(res.data.jobs || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (!isAuthorized) { navigate("/"); return null; }

  return (
    <main className="flex-1 bg-fb-surface py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-fb-text">All Available Jobs</h1>
          <span className="text-sm text-fb-muted bg-fb-panel border border-fb-border px-3 py-1 rounded-full">
            {jobs.length} positions
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="fb-card p-5 animate-pulse">
                <div className="h-4 bg-fb-surface rounded w-3/4 mb-3" />
                <div className="h-3 bg-fb-surface rounded w-1/2 mb-2" />
                <div className="h-3 bg-fb-surface rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="fb-card p-10 text-center">
            <FiBriefcase className="text-4xl text-fb-muted mx-auto mb-3" />
            <p className="text-fb-muted">No jobs found at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div key={job._id} className="fb-card p-5 hover:shadow-fb-hover transition-shadow duration-200 flex flex-col">
                <div className="flex-1">
                  <span className="inline-block text-xs font-semibold text-fb-primary bg-fb-light px-2 py-0.5 rounded mb-2">
                    {job.category}
                  </span>
                  <h2 className="text-fb-text font-bold text-base mb-2 leading-snug">{job.title}</h2>
                  <div className="flex items-center gap-1.5 text-fb-muted text-sm">
                    <FiMapPin className="flex-shrink-0" />
                    <span>{job.city}, {job.country}</span>
                  </div>
                </div>
                <Link
                  to={`/job/${job._id}`}
                  className="mt-4 flex items-center justify-between text-sm font-semibold text-fb-primary hover:text-fb-dark transition-colors"
                >
                  View Details <FiArrowRight />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Jobs;
