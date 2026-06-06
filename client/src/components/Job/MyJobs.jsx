import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const inputCls = (editing) =>
  `bg-transparent text-sm border-b ${editing ? "border-[#CED0D4] focus:border-[#1877F2] focus:outline-none text-[#050505]" : "border-transparent text-[#65676B]"} py-1 px-1 w-full transition-colors`;

const categoryOptions = [
  "Graphics & Design","Mobile App Development","Frontend Web Development",
  "MERN Stack Development","Account & Finance","Artificial Intelligence",
  "Video Animation","MEAN Stack Development","MEVN Stack Development","Data Entry Operator",
];

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/job/getmyjobs", { withCredentials: true })
      .then((res) => setMyJobs(res.data.myJobs))
      .catch((err) => { toast.error(err.response?.data?.message || "Failed to load"); setMyJobs([]); });
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/"); return null;
  }

  const handleInputChange = (jobId, field, value) =>
    setMyJobs((prev) => prev.map((j) => j._id === jobId ? { ...j, [field]: value } : j));

  const handleUpdateJob = async (jobId) => {
    const job = myJobs.find((j) => j._id === jobId);
    try {
      const res = await axios.put(`http://localhost:4000/api/v1/job/update/${jobId}`, job, { withCredentials: true });
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (err) { toast.error(err.response?.data?.message || "Update failed"); }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, { withCredentials: true });
      toast.success(res.data.message);
      setMyJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) { toast.error(err.response?.data?.message || "Delete failed"); }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#050505]">My Posted Jobs</h1>
          <p className="text-[#65676B] text-sm mt-1">{myJobs.length} job{myJobs.length !== 1 ? "s" : ""} posted</p>
        </div>

        {myJobs.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#CED0D4] p-12 text-center">
            <p className="text-[#65676B] font-medium">You haven't posted any jobs yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {myJobs.map((job) => {
              const editing = editingMode === job._id;
              return (
                <div key={job._id} className="bg-white rounded-xl border border-[#CED0D4] shadow-sm overflow-hidden">
                
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f2f5]">
                    <div>
                      <h2 className="font-bold text-[#050505] text-base">{job.title}</h2>
                      <p className="text-xs text-[#65676B] mt-0.5">{job.category} · {job.city}, {job.country}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {editing ? (
                        <>
                          <button onClick={() => handleUpdateJob(job._id)}
                            className="w-8 h-8 flex items-center justify-center bg-[#E7F3FF] text-[#1877F2] hover:bg-[#1877F2] hover:text-white rounded-lg transition-colors">
                            <FaCheck className="text-xs" />
                          </button>
                          <button onClick={() => setEditingMode(null)}
                            className="w-8 h-8 flex items-center justify-center bg-[#FFF0F0] text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                            <RxCross2 className="text-sm" />
                          </button>
                        </>
                      ) : (
                        <button onClick={() => setEditingMode(job._id)}
                          className="flex items-center gap-1.5 bg-[#f0f2f5] hover:bg-[#E7F3FF] text-[#1877F2] font-medium text-xs px-3 py-1.5 rounded-lg transition-colors">
                          <FaEdit className="text-xs" /> Edit
                        </button>
                      )}
                      <button onClick={() => handleDeleteJob(job._id)}
                        className="flex items-center gap-1.5 bg-[#FFF0F0] hover:bg-red-500 text-red-500 hover:text-white font-medium text-xs px-3 py-1.5 rounded-lg transition-colors">
                        <FaTrash className="text-xs" /> Delete
                      </button>
                    </div>
                  </div>

                
                  <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { label: "Title", field: "title", type: "text" },
                      { label: "Country", field: "country", type: "text" },
                      { label: "City", field: "city", type: "text" },
                    ].map(({ label, field, type }) => (
                      <div key={field}>
                        <p className="text-xs font-semibold text-[#65676B] uppercase tracking-wide mb-1">{label}</p>
                        <input type={type} disabled={!editing} value={job[field] || ""}
                          onChange={(e) => handleInputChange(job._id, field, e.target.value)}
                          className={inputCls(editing)} />
                      </div>
                    ))}

                    <div>
                      <p className="text-xs font-semibold text-[#65676B] uppercase tracking-wide mb-1">Category</p>
                      <select disabled={!editing} value={job.category}
                        onChange={(e) => handleInputChange(job._id, "category", e.target.value)}
                        className={`${inputCls(editing)} bg-white`}>
                        {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#65676B] uppercase tracking-wide mb-1">Salary</p>
                      {job.fixedSalary ? (
                        <input type="number" disabled={!editing} value={job.fixedSalary}
                          onChange={(e) => handleInputChange(job._id, "fixedSalary", e.target.value)}
                          className={inputCls(editing)} />
                      ) : (
                        <div className="flex gap-2">
                          <input type="number" placeholder="From" disabled={!editing} value={job.salaryFrom || ""}
                            onChange={(e) => handleInputChange(job._id, "salaryFrom", e.target.value)}
                            className={inputCls(editing)} />
                          <input type="number" placeholder="To" disabled={!editing} value={job.salaryTo || ""}
                            onChange={(e) => handleInputChange(job._id, "salaryTo", e.target.value)}
                            className={inputCls(editing)} />
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#65676B] uppercase tracking-wide mb-1">Expired</p>
                      <select disabled={!editing} value={job.expired}
                        onChange={(e) => handleInputChange(job._id, "expired", e.target.value)}
                        className={`${inputCls(editing)} bg-white`}>
                        <option value={false}>Active</option>
                        <option value={true}>Expired</option>
                      </select>
                    </div>
                  </div>

                  <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Description", field: "description" },
                      { label: "Location", field: "location" },
                    ].map(({ label, field }) => (
                      <div key={field}>
                        <p className="text-xs font-semibold text-[#65676B] uppercase tracking-wide mb-1">{label}</p>
                        <textarea rows={3} disabled={!editing} value={job[field] || ""}
                          onChange={(e) => handleInputChange(job._id, field, e.target.value)}
                          className={`${inputCls(editing)} resize-none w-full`} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;