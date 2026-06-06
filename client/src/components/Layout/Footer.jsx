import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaLinkedin, FaBriefcase } from "react-icons/fa";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) return null;

  return (
    <footer className="bg-[#18191c] text-[#b0b3b8] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <FaBriefcase className="text-[#1877F2]" />
          <span>© {new Date().getFullYear()} samsarga. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
