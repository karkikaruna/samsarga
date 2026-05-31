import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaRegUser, FaBriefcase } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState("");

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
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  if (isAuthorized) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-fb-surface flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-fb-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <FaBriefcase className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-fb-text">Welcome back</h1>
          <p className="text-fb-muted text-sm mt-1">Sign in to your JobBoard account</p>
        </div>

        {/* Card */}
        <div className="fb-card p-6 shadow-fb-hover">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Role */}
            <div>
              <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">
                Login As
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="fb-input appearance-none pr-8"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser className="absolute right-3 top-1/2 -translate-y-1/2 text-fb-muted pointer-events-none text-sm" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="fb-input pr-8"
                  required
                />
                <MdOutlineMailOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-fb-muted pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-fb-muted mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="fb-input pr-8"
                  required
                />
                <RiLock2Fill className="absolute right-3 top-1/2 -translate-y-1/2 text-fb-muted pointer-events-none" />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-1 py-3 text-base">
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center border-t border-fb-border pt-4">
            <p className="text-sm text-fb-muted">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-fb-primary font-semibold hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
