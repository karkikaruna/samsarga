import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (!isAuthorized) return null;

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthorized(false);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/job/getall", label: "All Jobs" },
    {
      to: "/applications/me",
      label: user?.role === "Employer" ? "Applicants" : "My Applications",
    },
    ...(user?.role === "Employer"
      ? [
          { to: "/job/post", label: "Post Job" },
          { to: "/job/me", label: "My Jobs" },
        ]
      : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-fb-panel border-b border-fb-border shadow-fb-card">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logojob.png" alt="JobBoard" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150
                    ${active
                      ? "bg-fb-light text-fb-primary"
                      : "text-fb-muted hover:bg-fb-surface hover:text-fb-text"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={handleLogout}
              className="ml-2 btn-primary text-sm"
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-fb-muted text-2xl p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <RxCross2 /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-fb-panel border-t border-fb-border px-4 pb-4">
          <ul className="flex flex-col gap-1 mt-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                    ${pathname === link.to
                      ? "bg-fb-light text-fb-primary"
                      : "text-fb-muted hover:bg-fb-surface"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => { setOpen(false); handleLogout(); }}
                className="w-full mt-1 btn-primary text-sm"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
