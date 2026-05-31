import React, { useContext, useState } from "react";
import { FaRegUser, FaBriefcase } from "react-icons/fa";
import { FaPencilAlt, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail]       = useState("");
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      toast.success(data.message);
      setName(""); setEmail(""); setPassword(""); setPhone(""); setRole("");
      setIsAuthorized(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  if (isAuthorized) return <Navigate to="/" />;

  const fields = [
    {
      label: "Register As",
      content: (
        <div className="relative">
          <select value={role} onChange={(e) => setRole(e.target.value)} className="fb-input appearance-none pr-8" required>
            <option value="">Select Role</option>
            <option value="Employer">Employer</option>
            <option value="Job Seeker">Job Seeker</option>
          </select>
          <FaRegUser className="absolute right-3 top-1/2 -translate-y-1/2 text-fb-muted pointer-events-none text-sm" />
        </div>
      ),
    },
    {
      label: "Full Name",
      content: (
        <div className="relative">
          <input type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} className="fb-input pr-8" required />
          <FaPencilAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-fb-muted pointer-events-none text-sm" />
        </div>
      ),
    },
    {
      label: "Email Address",
      content: (
        <div className="relative">
          <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="fb-input pr-8" required />
          <MdOutlineMailOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-fb-muted pointer-events-none" />
        </div>
      ),
    },
    {
      label: "Phone Number",
      content: (
        <div className="relative">
          <input type="tel" placeholder="+1 234 567 8900" value={phone} onChange={(e) => setPhone(e.target.value)} className="fb-input pr-8" required />
          <FaPhoneAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-fb-muted pointer-events-none text-sm" />
        </div>
      ),
    },
    {
      label: "Password",
      content: (
        <div className="relative">
          <input type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} className="fb-input pr-8" required />
          <RiLock2Fill className="absolute right-3 top-1/2 -translate-y-1/2 text-fb-muted pointer-events-none" />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-fb-surface flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-fb-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <FaBriefcase className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-fb-text">Create account</h1>
          <p className="text-fb-muted text-sm mt-1">Join JobBoard — it's free</p>
        </div>

        <div className="fb-card p-6 shadow-fb-hover">
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {fields.map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">
                  {f.label}
                </label>
                {f.content}
              </div>
            ))}
            <button type="submit" className="btn-accent w-full mt-1 py-3 text-base">
              Create Account
            </button>
          </form>

          <div className="mt-4 text-center border-t border-fb-border pt-4">
            <p className="text-sm text-fb-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-fb-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
