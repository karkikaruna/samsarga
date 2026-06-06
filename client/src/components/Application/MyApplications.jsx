import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaTrash } from "react-icons/fa";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const url =
      user?.role === "Employer"
        ? "http://localhost:4000/api/v1/application/employer/getall"
        : "http://localhost:4000/api/v1/application/jobseeker/getall";

    axios
      .get(url, { withCredentials: true })
      .then((res) => setApplications(res.data.applications))
      .catch((err) => toast.error(err.response?.data?.message || "Failed to load"));
  }, [isAuthorized, user]);

  if (!isAuthorized) { navigateTo("/"); return null; }

  const deleteApplication = (id) => {
    axios
      .delete(`http://localhost:4000/api/v1/application/delete/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setApplications((prev) => prev.filter((a) => a._id !== id));
      })
      .catch((err) => toast.error(err.response?.data?.message || "Failed to delete"));
  };

  const isEmployer = user?.role === "Employer";

  return (
    <div className="min-h-screen bg-[#f0f2f5] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#050505]">
            {isEmployer ? "Applications from Job Seekers" : "My Applications"}
          </h1>
          <p className="text-[#65676B] text-sm mt-1">
            {applications.length} application{applications.length !== 1 ? "s" : ""}
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#CED0D4] p-12 text-center">
            <FaFileAlt className="text-[#CED0D4] text-4xl mx-auto mb-3" />
            <p className="text-[#65676B] font-medium">No applications found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app._id} className="bg-white rounded-xl border border-[#CED0D4] shadow-sm overflow-hidden">
                <div className="p-5 flex flex-col sm:flex-row gap-5">
                
                  <div className="flex-1 space-y-2">
                    <h2 className="font-bold text-[#050505] text-base">{app.name}</h2>
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center gap-1.5 text-xs text-[#65676B]">
                        <FaEnvelope className="text-[#1877F2]" /> {app.email}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-[#65676B]">
                        <FaPhone className="text-[#1877F2]" /> {app.phone}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-[#65676B]">
                        <FaMapMarkerAlt className="text-[#1877F2]" /> {app.address}
                      </span>
                    </div>
                    {app.coverLetter && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-[#65676B] uppercase tracking-wide mb-1">Cover Letter</p>
                        <p className="text-sm text-[#050505] leading-relaxed line-clamp-3">{app.coverLetter}</p>
                      </div>
                    )}
                  </div>

               
                  <div className="flex flex-col items-center gap-3 sm:w-32">
                    <div
                      className="w-24 h-28 border border-[#CED0D4] rounded-lg overflow-hidden cursor-pointer hover:border-[#1877F2] transition-colors"
                      onClick={() => { setResumeImageUrl(app.resume?.url); setModalOpen(true); }}
                    >
                      <img src={app.resume?.url} alt="Resume" className="w-full h-full object-cover" />
                    </div>
                    <button
                      onClick={() => { setResumeImageUrl(app.resume?.url); setModalOpen(true); }}
                      className="text-xs text-[#1877F2] font-medium hover:underline"
                    >
                      View Full
                    </button>
                  </div>
                </div>

                {!isEmployer && (
                  <div className="px-5 py-3 bg-[#f0f2f5] border-t border-[#CED0D4] flex justify-end">
                    <button
                      onClick={() => deleteApplication(app._id)}
                      className="flex items-center gap-1.5 bg-[#FFF0F0] hover:bg-red-500 text-red-500 hover:text-white font-medium text-xs px-4 py-1.5 rounded-lg transition-colors"
                    >
                      <FaTrash className="text-xs" /> Withdraw
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default MyApplications;