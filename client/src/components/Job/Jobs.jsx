import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { FaMapMarkerAlt, FaTag, FaBriefcase } from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
  
    if (!isAuthorized) {
      navigateTo("/login");
      return;
    }
    axios
      .get("http://localhost:4000/api/v1/job/getall", { withCredentials: true })
      .then((res) => { setJobs(res.data.jobs || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [isAuthorized]);

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-[#f0f2f5] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#050505]">All Available Jobs</h1>
          <p className="text-[#65676B] text-sm mt-1">
            {loading ? "Loading..." : `${jobs.length} job${jobs.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#CED0D4] p-5 animate-pulse">
                <div className="h-4 bg-[#f0f2f5] rounded w-3/4 mb-3" />
                <div className="h-3 bg-[#f0f2f5] rounded w-1/2 mb-2" />
                <div className="h-3 bg-[#f0f2f5] rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <FaBriefcase className="text-[#CED0D4] text-5xl mx-auto mb-4" />
            <p className="text-[#65676B] font-medium">No jobs available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl border border-[#CED0D4] p-5 hover:shadow-md hover:border-[#1877F2] transition-all duration-200 flex flex-col gap-3"
              >
                <div>
                  <h2 className="text-[#050505] font-bold text-base leading-snug">{job.title}</h2>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs text-[#65676B]">
                    <FaTag className="text-[#1877F2] flex-shrink-0" />
                    <span>{job.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#65676B]">
                    <FaMapMarkerAlt className="text-[#1877F2] flex-shrink-0" />
                    <span>{job.country}</span>
                  </div>
                </div>
                <div className="mt-auto pt-3 border-t border-[#f0f2f5]">
                  <Link
                    to={`/job/${job._id}`}
                    className="block w-full bg-[#E7F3FF] hover:bg-[#1877F2] text-[#1877F2] hover:text-white font-semibold text-sm py-2 rounded-lg text-center transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
