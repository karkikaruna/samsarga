import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../../main";
import { FiArrowLeft, FiUpload } from "react-icons/fi";

const Application = () => {
  const [form, setForm] = useState({ name:"", email:"", phone:"", address:"", coverLetter:"" });
  const [resume, setResume] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    formData.append("resume", resume);
    formData.append("jobId", id);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      setForm({ name:"", email:"", phone:"", address:"", coverLetter:"" });
      setResume(null);
      toast.success(data.message);
      navigate("/job/getall");
    } catch (err) {
      toast.error(err.response?.data?.message || "Application failed");
    }
  };

  if (!isAuthorized || user?.role === "Employer") { navigate("/"); return null; }

  return (
    <main className="flex-1 bg-fb-surface py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-fb-primary text-sm font-medium mb-5 hover:underline">
          <FiArrowLeft /> Back
        </button>

        <div className="fb-card overflow-hidden">
          <div className="bg-fb-primary px-6 py-5">
            <h1 className="text-white font-bold text-xl">Job Application</h1>
            <p className="text-blue-100 text-sm mt-0.5">Complete the form below to apply</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">Full Name *</label>
                <input type="text" placeholder="Your full name" value={form.name} onChange={set("name")} className="fb-input" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">Email Address *</label>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} className="fb-input" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">Phone Number *</label>
                <input type="tel" placeholder="+1 234 567 8900" value={form.phone} onChange={set("phone")} className="fb-input" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">Address *</label>
                <input type="text" placeholder="Your address" value={form.address} onChange={set("address")} className="fb-input" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">Cover Letter *</label>
              <textarea
                rows={5}
                placeholder="Tell us why you're a great fit for this role..."
                value={form.coverLetter}
                onChange={set("coverLetter")}
                className="fb-input resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">Resume (PDF / Image) *</label>
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-fb-border rounded-lg cursor-pointer bg-fb-surface hover:border-fb-primary hover:bg-fb-light transition-colors duration-150">
                <FiUpload className="text-fb-primary text-2xl mb-1" />
                <span className="text-sm text-fb-muted">
                  {resume ? resume.name : "Click to upload or drag & drop"}
                </span>
                <span className="text-xs text-fb-muted mt-0.5">.pdf, .jpg, .png</span>
                <input type="file" accept=".pdf,.jpg,.png" onChange={(e) => setResume(e.target.files[0])} className="hidden" required />
              </label>
            </div>

            <button type="submit" className="btn-primary w-full py-3 text-base">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Application;
