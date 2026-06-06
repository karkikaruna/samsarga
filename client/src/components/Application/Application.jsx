import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const inputCls =
  "w-full px-3 py-2.5 border border-[#CED0D4] rounded-lg text-sm text-[#050505] bg-white focus:outline-none focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/20 transition";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  if (!isAuthorized || user?.role === "Employer") {
    navigateTo("/");
    return null;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type on the frontend too
    const allowed = ["image/png", "image/jpeg", "image/webp", "application/pdf"];
    if (!allowed.includes(file.type)) {
      toast.error("Only PNG, JPG, WEBP, or PDF files are allowed.");
      e.target.value = "";
      return;
    }

   
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB.");
      e.target.value = "";
      return;
    }

    setResume(file);
    setResumeName(file.name);
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    setSubmitting(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(data.message);
     
      setName(""); setEmail(""); setCoverLetter("");
      setPhone(""); setAddress(""); setResume(null); setResumeName("");
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] py-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#050505]">Apply for this Job</h1>
          <p className="text-[#65676B] text-sm mt-1">
            Complete the form below to submit your application
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#CED0D4] shadow-sm p-6">
          <form onSubmit={handleApplication} className="space-y-4">
            {[
              { label: "Full Name",     type: "text",   placeholder: "Your full name",       val: name,    set: setName },
              { label: "Email Address", type: "email",  placeholder: "you@example.com",      val: email,   set: setEmail },
              { label: "Phone Number",  type: "number", placeholder: "Your phone number",    val: phone,   set: setPhone },
              { label: "Address",       type: "text",   placeholder: "Your current address", val: address, set: setAddress },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-[#65676B] uppercase tracking-wide mb-1.5">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={f.val}
                  onChange={(e) => f.set(e.target.value)}
                  required
                  className={inputCls}
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold text-[#65676B] uppercase tracking-wide mb-1.5">
                Cover Letter
              </label>
              <textarea
                rows={5}
                placeholder="Tell the employer why you're a great fit..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                required
                className={`${inputCls} resize-none`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#65676B] uppercase tracking-wide mb-1.5">
                Resume
              </label>
              <div className="border-2 border-dashed border-[#CED0D4] rounded-lg p-4 text-center hover:border-[#1877F2] transition-colors cursor-pointer relative">
                <input
                  type="file"
                 
                  accept=".png,.jpg,.jpeg,.webp,.pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {resumeName ? (
                  <div className="flex items-center justify-center gap-2 text-[#1877F2]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium truncate max-w-xs">{resumeName}</span>
                  </div>
                ) : (
                  <div>
                    <svg className="w-8 h-8 text-[#CED0D4] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-[#65676B]">
                      Click to upload your resume
                    </p>
                    <p className="text-xs text-[#CED0D4] mt-1">PNG, JPG, WEBP or PDF · Max 5MB</p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Application;