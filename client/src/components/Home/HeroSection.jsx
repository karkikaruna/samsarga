import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const stats = [
    { id: 1, title: "1,23,441", subTitle: "Live Jobs",    icon: <FaSuitcase /> },
    { id: 2, title: "91,220",   subTitle: "Companies",    icon: <FaBuilding /> },
    { id: 3, title: "2,34,200", subTitle: "Job Seekers",  icon: <FaUsers />   },
    { id: 4, title: "1,03,761", subTitle: "Employers",    icon: <FaUserPlus /> },
  ];

  return (
    <section className="bg-fb-surface">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-14 flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <p className="inline-block text-xs font-semibold text-fb-primary bg-fb-light px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            #1 Job Platform
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-fb-text leading-snug mb-4">
            Find your dream job or{" "}
            <span className="text-fb-primary">hire the best talent</span>
          </h1>
          <p className="text-fb-muted text-base mb-8 max-w-md mx-auto md:mx-0">
            Connect with thousands of employers and job seekers on one platform built for opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link to="/job/getall" className="btn-primary text-center">
              Browse Jobs
            </Link>
            <Link to="/job/post" className="btn-accent text-center">
              Post a Vacancy
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="/jobboard.svg"
            alt="Job board illustration"
            className="w-full max-w-sm drop-shadow-md"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="border-t border-fb-border bg-fb-panel">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((item) => (
            <div
              key={item.id}
              className="fb-card flex items-center gap-3 px-4 py-3 hover:shadow-fb-hover transition-shadow duration-200"
            >
              <span className="text-fb-primary text-2xl">{item.icon}</span>
              <div>
                <p className="text-fb-text font-bold text-base leading-tight">{item.title}</p>
                <p className="text-fb-muted text-xs">{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
