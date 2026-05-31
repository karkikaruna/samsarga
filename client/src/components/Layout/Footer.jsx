import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaLinkedin, FaBriefcase } from "react-icons/fa";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) return null;

  return (
    <footer className="bg-fb-panel border-t border-fb-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-fb-muted text-sm">
          <FaBriefcase className="text-fb-primary" />
          <span>© {new Date().getFullYear()} JobBoard. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="https://www.linkedin.com/company/codsoft/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fb-muted hover:text-fb-primary transition-colors text-xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
