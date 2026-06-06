import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  if (!isAuthorized) return null;

  return (
    <nav className="bg-[#1877F2] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
         
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/logojob.png" alt="JobBoard" className="h-8 w-auto" />
          </Link>

         
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/job/getall">All Jobs</NavLink>
            <NavLink to="/applications/me">
              {user?.role === "Employer" ? "Applications" : "My Applications"}
            </NavLink>
            {user?.role === "Employer" && (
              <>
                <NavLink to="/job/post">Post Job</NavLink>
                <NavLink to="/job/me">My Jobs</NavLink>
              </>
            )}
            <button
              onClick={handleLogout}
              className="ml-3 bg-white text-[#1877F2] font-semibold text-sm px-4 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
            >
              Logout
            </button>
          </div>

    
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-[#166FE5] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>


        {menuOpen && (
          <div className="md:hidden border-t border-[#166FE5] py-2 space-y-1">
            <MobileNavLink to="/" onClick={() => setMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/job/getall" onClick={() => setMenuOpen(false)}>All Jobs</MobileNavLink>
            <MobileNavLink to="/applications/me" onClick={() => setMenuOpen(false)}>
              {user?.role === "Employer" ? "Applications" : "My Applications"}
            </MobileNavLink>
            {user?.role === "Employer" && (
              <>
                <MobileNavLink to="/job/post" onClick={() => setMenuOpen(false)}>Post Job</MobileNavLink>
                <MobileNavLink to="/job/me" onClick={() => setMenuOpen(false)}>My Jobs</MobileNavLink>
              </>
            )}
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="w-full text-left text-white font-medium text-sm px-3 py-2 rounded-md hover:bg-[#166FE5] transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-[#166FE5] transition-colors"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-[#166FE5] transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;
