import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser, FaBriefcase } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      toast.success(data.message);
      setEmail(""); setPassword(""); setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  if (isAuthorized) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-6 text-center">
        <FaBriefcase className="text-[#1877F2] text-4xl mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-[#050505]">JobBoard</h1>
        <p className="text-[#65676B] text-sm mt-1">Sign in to your account</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-xl shadow-md border border-[#CED0D4] p-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#65676B] mb-1.5 uppercase tracking-wide">
              Login As
            </label>
            <div className="relative">
              <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65676B] text-sm" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-[#CED0D4] rounded-lg text-sm text-[#050505] bg-white focus:outline-none focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/20 transition"
              >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#65676B] mb-1.5 uppercase tracking-wide">
              Email Address
            </label>
            <div className="relative">
              <MdOutlineMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65676B] text-sm" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-[#CED0D4] rounded-lg text-sm text-[#050505] focus:outline-none focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/20 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#65676B] mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <RiLock2Fill className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65676B] text-sm" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-[#CED0D4] rounded-lg text-sm text-[#050505] focus:outline-none focus:border-[#1877F2] focus:ring-2 focus:ring-[#1877F2]/20 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2"
          >
            Log In
          </button>
        </form>

        <div className="mt-5 pt-5 border-t border-[#CED0D4] text-center">
          <p className="text-sm text-[#65676B]">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#1877F2] font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
