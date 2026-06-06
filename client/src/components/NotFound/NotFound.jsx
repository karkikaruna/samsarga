import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col items-center justify-center px-4 text-center">
      <img src="/error.png" alt="Page not found" className="w-48 h-auto mb-8 opacity-80" />
      <h1 className="text-3xl font-bold text-[#050505] mb-2">Page Not Found</h1>
      <p className="text-[#65676B] text-sm mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
