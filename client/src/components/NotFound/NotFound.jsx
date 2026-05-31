import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  return (
    <main className="flex-1 bg-fb-surface flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <img src="/error.png" alt="404 Not Found" className="w-48 mx-auto mb-6 opacity-80" />
        <h1 className="text-3xl font-bold text-fb-text mb-2">Page Not Found</h1>
        <p className="text-fb-muted mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <FiArrowLeft /> Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
