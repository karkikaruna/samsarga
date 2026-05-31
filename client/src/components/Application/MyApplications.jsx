import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { FiTrash2, FiFileText } from "react-icons/fi";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.role) return;
    const url = user.role === "Employer"
      ? "http://localhost:4000/api/v1/application/employer/getall"
      : "http://localhost:4000/api/v1/application/jobseeker/getall";
    axios.get(url, { withCredentials: true })
      .then((res) => setApplications(res.data.applications || []))
      .catch((err) => toast.error(err.response?.data?.message || "Failed to load"));
  }, [isAuthorized, user]);

  if (!isAuthorized) { navigate("/"); return null; }

  const deleteApplication = (id) => {
    if (!window.confirm("Delete this application?")) return;
    axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setApplications((prev) => prev.filter((a) => a._id !== id));
      })
      .catch((err) => toast.error(err.response?.data?.message || "Delete failed"));
  };

  const isEmployer = user?.role === "Employer";

  const fields = (el) => [
    { label: "Name",         value: el.name },
    { label: "Email",        value: el.email },
    { label: "Phone",        value: el.phone },
    { label: "Address",      value: el.address },
  ];

  return (
    <main className="flex-1 bg-fb-surface py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-fb-text">
            {isEmployer ? "Applications from Candidates" : "My Applications"}
          </h1>
          <span className="text-sm text-fb-muted bg-fb-panel border border-fb-border px-3 py-1 rounded-full">
            {applications.length} total
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="fb-card p-10 text-center text-fb-muted">
            No applications found.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {applications.map((el) => (
              <div key={el._id} className="fb-card p-5 hover:shadow-fb-hover transition-shadow duration-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Info */}
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    {fields(el).map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs font-semibold text-fb-muted uppercase tracking-wide">{label}</p>
                        <p className="text-fb-text text-sm font-medium mt-0.5">{value}</p>
                      </div>
                    ))}
                    <div className="col-span-2">
                      <p className="text-xs font-semibold text-fb-muted uppercase tracking-wide">Cover Letter</p>
                      <p className="text-fb-text text-sm mt-0.5 line-clamp-2">{el.coverLetter}</p>
                    </div>
                  </div>

                  {/* Resume + Actions */}
                  <div className="flex flex-col items-center gap-3 sm:w-36">
                    {el.resume?.url && (
                      <div
                        className="w-full h-24 rounded-lg overflow-hidden border border-fb-border cursor-pointer hover:border-fb-primary transition-colors"
                        onClick={() => { setResumeUrl(el.resume.url); setModalOpen(true); }}
                        title="View resume"
                      >
                        <img src={el.resume.url} alt="Resume" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <button
                      onClick={() => { setResumeUrl(el.resume.url); setModalOpen(true); }}
                      className="btn-ghost flex items-center gap-1.5 text-xs w-full justify-center"
                    >
                      <FiFileText /> View Resume
                    </button>
                    {!isEmployer && (
                      <button
                        onClick={() => deleteApplication(el._id)}
                        className="btn-danger flex items-center gap-1.5 text-xs w-full justify-center"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && <ResumeModal imageUrl={resumeUrl} onClose={() => setModalOpen(false)} />}
    </main>
  );
};

export default MyApplications;
