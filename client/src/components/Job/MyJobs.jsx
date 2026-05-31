import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  "Graphics & Design", "Mobile App Development", "Frontend Web Development",
  "MERN Stack Development", "MEAN Stack Development", "MEVN Stack Development",
  "Account & Finance", "Artificial Intelligence", "Video Animation", "Data Entry Operator",
];

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/job/getmyjobs", { withCredentials: true })
      .then((res) => setMyJobs(res.data.myJobs || []))
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to load jobs");
        setMyJobs([]);
      });
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigate("/"); return null;
  }

  const handleUpdate = async (jobId) => {
    const updatedJob = myJobs.find((j) => j._id === jobId);
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/job/update/${jobId}`,
        updatedJob, { withCredentials: true }
      );
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Delete this job? This cannot be undone.")) return;
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/job/delete/${jobId}`, { withCredentials: true }
      );
      toast.success(res.data.message);
      setMyJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleChange = (jobId, field, value) =>
    setMyJobs((prev) => prev.map((j) => j._id === jobId ? { ...j, [field]: value } : j));

  const inputCls = (jobId) =>
    `fb-input text-sm ${editingMode === jobId ? "" : "opacity-70 cursor-not-allowed bg-fb-surface/40"}`;

  return (
    <main className="flex-1 bg-fb-surface py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-fb-text">Your Posted Jobs</h1>
          <span className="text-sm text-fb-muted bg-fb-panel border border-fb-border px-3 py-1 rounded-full">
            {myJobs.length} jobs
          </span>
        </div>

        {myJobs.length === 0 ? (
          <div className="fb-card p-10 text-center text-fb-muted">
            You haven&apos;t posted any jobs yet.
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {myJobs.map((job) => {
              const editing = editingMode === job._id;
              return (
                <div key={job._id} className="fb-card overflow-hidden">
                  {/* Card header */}
                  <div className={`px-5 py-3 flex items-center justify-between border-b border-fb-border ${editing ? "bg-fb-light" : "bg-fb-panel"}`}>
                    <span className="text-sm font-bold text-fb-text truncate">{job.title}</span>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      {editing ? (
                        <>
                          <button onClick={() => handleUpdate(job._id)} className="w-8 h-8 flex items-center justify-center rounded-md bg-fb-accent text-white hover:bg-fb-accentDk transition-colors" title="Save">
                            <FaCheck />
                          </button>
                          <button onClick={() => setEditingMode(null)} className="w-8 h-8 flex items-center justify-center rounded-md bg-fb-border text-fb-text hover:bg-fb-muted/30 transition-colors" title="Cancel">
                            <RxCross2 />
                          </button>
                        </>
                      ) : (
                        <button onClick={() => setEditingMode(job._id)} className="btn-ghost flex items-center gap-1.5 text-xs">
                          <FiEdit2 /> Edit
                        </button>
                      )}
                      <button onClick={() => handleDelete(job._id)} className="w-8 h-8 flex items-center justify-center rounded-md text-fb-danger hover:bg-fb-danger/10 transition-colors" title="Delete">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { label: "Title", field: "title", type: "text" },
                      { label: "Country", field: "country", type: "text" },
                      { label: "City", field: "city", type: "text" },
                    ].map(({ label, field, type }) => (
                      <div key={field}>
                        <label className="block text-xs font-semibold text-fb-muted mb-1 uppercase tracking-wide">{label}</label>
                        <input
                          type={type}
                          disabled={!editing}
                          value={job[field] || ""}
                          onChange={(e) => handleChange(job._id, field, e.target.value)}
                          className={inputCls(job._id)}
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-xs font-semibold text-fb-muted mb-1 uppercase tracking-wide">Category</label>
                      <select
                        disabled={!editing}
                        value={job.category}
                        onChange={(e) => handleChange(job._id, "category", e.target.value)}
                        className={inputCls(job._id)}
                      >
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-fb-muted mb-1 uppercase tracking-wide">Salary</label>
                      {job.fixedSalary ? (
                        <input type="number" disabled={!editing} value={job.fixedSalary}
                          onChange={(e) => handleChange(job._id, "fixedSalary", e.target.value)}
                          className={inputCls(job._id)} />
                      ) : (
                        <div className="flex gap-2">
                          <input type="number" disabled={!editing} value={job.salaryFrom}
                            onChange={(e) => handleChange(job._id, "salaryFrom", e.target.value)}
                            className={inputCls(job._id)} placeholder="From" />
                          <input type="number" disabled={!editing} value={job.salaryTo}
                            onChange={(e) => handleChange(job._id, "salaryTo", e.target.value)}
                            className={inputCls(job._id)} placeholder="To" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-fb-muted mb-1 uppercase tracking-wide">Status</label>
                      <select
                        disabled={!editing}
                        value={String(job.expired)}
                        onChange={(e) => handleChange(job._id, "expired", e.target.value === "true")}
                        className={inputCls(job._id)}
                      >
                        <option value="false">Active</option>
                        <option value="true">Expired</option>
                      </select>
                    </div>
                  </div>

                  {/* Long fields */}
                  <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-fb-muted mb-1 uppercase tracking-wide">Description</label>
                      <textarea rows={4} disabled={!editing} value={job.description}
                        onChange={(e) => handleChange(job._id, "description", e.target.value)}
                        className={`${inputCls(job._id)} resize-none`} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-fb-muted mb-1 uppercase tracking-wide">Location</label>
                      <textarea rows={4} disabled={!editing} value={job.location}
                        onChange={(e) => handleChange(job._id, "location", e.target.value)}
                        className={`${inputCls(job._id)} resize-none`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyJobs;
