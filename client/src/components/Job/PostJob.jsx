import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const CATEGORIES = [
  "Graphics & Design", "Mobile App Development", "Frontend Web Development",
  "MERN Stack Development", "MEAN Stack Development", "MEVN Stack Development",
  "Account & Finance", "Artificial Intelligence", "Video Animation", "Data Entry Operator",
];

const PostJob = () => {
  const [form, setForm] = useState({
    title: "", description: "", category: "",
    country: "", city: "", location: "",
    salaryFrom: "", salaryTo: "", fixedSalary: "",
    salaryType: "default",
  });

  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title, description: form.description,
      category: form.category, country: form.country,
      city: form.city, location: form.location,
      ...(form.salaryType === "Fixed Salary"
        ? { fixedSalary: form.fixedSalary }
        : { salaryFrom: form.salaryFrom, salaryTo: form.salaryTo }),
    };
    try {
      const res = await axios.post("http://localhost:4000/api/v1/job/post", payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success(res.data.message);
      setForm({ title:"",description:"",category:"",country:"",city:"",location:"",salaryFrom:"",salaryTo:"",fixedSalary:"",salaryType:"default" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job");
    }
  };

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigate("/"); return null;
  }

  return (
    <main className="flex-1 bg-fb-surface py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="fb-card overflow-hidden">
          {/* Header */}
          <div className="bg-fb-primary px-6 py-5">
            <h1 className="text-white font-bold text-xl">Post a New Job</h1>
            <p className="text-blue-100 text-sm mt-0.5">Fill in the details to attract the right candidates</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
            {/* Title + Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">Job Title *</label>
                <input type="text" value={form.title} onChange={set("title")} placeholder="e.g. Senior React Developer" className="fb-input" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">Category *</label>
                <select value={form.category} onChange={set("category")} className="fb-input" required>
                  <option value="">Select Category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Country + City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">Country *</label>
                <input type="text" value={form.country} onChange={set("country")} placeholder="e.g. United States" className="fb-input" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">City *</label>
                <input type="text" value={form.city} onChange={set("city")} placeholder="e.g. San Francisco" className="fb-input" required />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">Full Address</label>
              <input type="text" value={form.location} onChange={set("location")} placeholder="Street address or building" className="fb-input" />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">Salary Type *</label>
              <select value={form.salaryType} onChange={set("salaryType")} className="fb-input" required>
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
            </div>

            {form.salaryType === "Fixed Salary" && (
              <div>
                <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">Fixed Salary (USD) *</label>
                <input type="number" value={form.fixedSalary} onChange={set("fixedSalary")} placeholder="e.g. 80000" className="fb-input" required />
              </div>
            )}
            {form.salaryType === "Ranged Salary" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">From (USD) *</label>
                  <input type="number" value={form.salaryFrom} onChange={set("salaryFrom")} placeholder="e.g. 60000" className="fb-input" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">To (USD) *</label>
                  <input type="number" value={form.salaryTo} onChange={set("salaryTo")} placeholder="e.g. 100000" className="fb-input" required />
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">Job Description *</label>
              <textarea
                rows={6}
                value={form.description}
                onChange={set("description")}
                placeholder="Describe responsibilities, requirements, benefits..."
                className="fb-input resize-none"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full py-3 text-base">
              Publish Job
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default PostJob;
