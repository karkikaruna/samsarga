import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const categoryOptions = [
  "Graphics & Design", "Mobile App Development", "Frontend Web Development",
  "MERN Stack Development", "Account & Finance", "Artificial Intelligence",
  "Video Animation", "MEAN Stack Development", "MEVN Stack Development", "Data Entry Operator",
];

const InputField = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-[#65676B] uppercase tracking-wide">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full px-3 py-2.5 border border-[#CED0D4] rounded-lg text-sm text-[#050505] bg-white focus:outline-none focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/20 transition";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Not logged in - send to login
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-[#CED0D4] shadow-sm p-8 max-w-sm w-full text-center">
          <div className="w-14 h-14 bg-[#E7F3FF] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#050505] mb-2">Login Required</h2>
          <p className="text-sm text-[#65676B] mb-6">You need to be logged in as an Employer to post a job.</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigateTo("/login")}
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => navigateTo("/register")}
              className="w-full bg-[#f0f2f5] hover:bg-[#e4e6ea] text-[#050505] font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (user?.role !== "Employer") {
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-[#CED0D4] shadow-sm p-8 max-w-sm w-full text-center">
          <div className="w-14 h-14 bg-[#FFF3CD] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-[#F4A200]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#050505] mb-2">Employer Account Required</h2>
          <p className="text-sm text-[#65676B] mb-6">
            You're logged in as a <strong>Job Seeker</strong>. Only Employer accounts can post job listings.
          </p>
          <button
            onClick={() => navigateTo("/")}
            className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleJobPost = async (e) => {
    e.preventDefault();
    const payload =
      salaryType === "Fixed Salary"
        ? { title, description, category, country, city, location, fixedSalary }
        : { title, description, category, country, city, location, salaryFrom, salaryTo };

    try {
      const res = await axios.post("http://localhost:4000/api/v1/job/post", payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success(res.data.message);
      setTitle(""); setDescription(""); setCategory(""); setCountry(""); setCity("");
      setLocation(""); setSalaryFrom(""); setSalaryTo(""); setFixedSalary(""); setSalaryType("default");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#050505]">Post a New Job</h1>
          <p className="text-[#65676B] text-sm mt-1">Fill in the details to attract the right candidates</p>
        </div>

        <div className="bg-white rounded-xl border border-[#CED0D4] shadow-sm p-6">
          <form onSubmit={handleJobPost} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField label="Job Title">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior React Developer" className={inputCls} />
              </InputField>
              <InputField label="Category">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
                  <option value="">Select Category</option>
                  {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </InputField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField label="Country">
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Pakistan" className={inputCls} />
              </InputField>
              <InputField label="City">
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Karachi" className={inputCls} />
              </InputField>
            </div>

            <InputField label="Location">
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder="Street address or area" className={inputCls} />
            </InputField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField label="Salary Type">
                <select value={salaryType} onChange={(e) => setSalaryType(e.target.value)} className={inputCls}>
                  <option value="default">Select Salary Type</option>
                  <option value="Fixed Salary">Fixed Salary</option>
                  <option value="Ranged Salary">Ranged Salary</option>
                </select>
              </InputField>

              <InputField label="Salary">
                {salaryType === "default" ? (
                  <p className="text-xs text-[#65676B] pt-3">Please select a salary type first.</p>
                ) : salaryType === "Fixed Salary" ? (
                  <input type="number" placeholder="Fixed amount (e.g. 80000)" value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)} className={inputCls} />
                ) : (
                  <div className="flex gap-2">
                    <input type="number" placeholder="From" value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)} className={inputCls} />
                    <input type="number" placeholder="To" value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)} className={inputCls} />
                  </div>
                )}
              </InputField>
            </div>

            <InputField label="Job Description">
              <textarea rows={6} value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the role, responsibilities, requirements..."
                className={`${inputCls} resize-none`} />
            </InputField>

            <button
              type="submit"
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              Post Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;