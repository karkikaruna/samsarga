import React, { useContext } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";

const HeroSection = () => {
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  const stats = [
    { id: 1, title: "1,23,441", subTitle: "Live Jobs",    icon: <FaSuitcase /> },
    { id: 2, title: "91,220",   subTitle: "Companies",    icon: <FaBuilding /> },
    { id: 3, title: "2,34,200", subTitle: "Job Seekers",  icon: <FaUsers />   },
    { id: 4, title: "1,03,761", subTitle: "Employers",    icon: <FaUserPlus /> },
  ];

  const handleFindJobs = () => {
    if (!isAuthorized) {
      toast.error("Please login to browse jobs.");
      navigate("/login");
      return;
    }
    navigate("/job/getall");
  };

  const handlePostJob = () => {
    if (!isAuthorized) {
      toast.error("Please login to post a job.");
      navigate("/login");
      return;
    }
    if (user?.role !== "Employer") {
      toast.error("Only employers can post jobs.");
      return;
    }
    navigate("/job/post");
  };

  return (
    <section className="bg-[#f0f2f5]">
   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-[#050505] leading-snug mb-4">
            Find your dream job or{" "}
            <span className="text-[#1877F2]">hire the best talent</span>
          </h1>
          <p className="text-[#65676B] text-base mb-8 max-w-lg leading-relaxed">
            Connect with thousands of employers and job seekers on one platform
            built for opportunity. Your next career move starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <button
              onClick={handleFindJobs}
              className="bg-[#1877F2] hover:bg-[#166FE5] active:bg-[#0F5DC4] text-white font-semibold px-6 py-2.5 rounded-md transition-colors duration-150 text-center text-sm"
            >
              Find Jobs
            </button>
            <button
              onClick={handlePostJob}
              className="bg-[#42B72A] hover:brightness-95 text-white font-semibold px-6 py-2.5 rounded-md transition-all duration-150 text-center text-sm"
            >
              Post a Vacancy
            </button>
          </div>
          
          {!isAuthorized && (
            <p className="mt-4 text-xs text-[#65676B]">
              <span
                onClick={() => navigate("/login")}
                className="text-[#1877F2] font-semibold cursor-pointer hover:underline"
              >
                Sign in
              </span>{" "}
              or{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-[#1877F2] font-semibold cursor-pointer hover:underline"
              >
                create an account
              </span>{" "}
              to get started.
            </p>
          )}

          {isAuthorized && user?.role === "Job Seeker" && (
            <p className="mt-4 text-xs text-[#65676B]">
              Logged in as a <strong>Job Seeker</strong>. Only Employer accounts can post jobs.
            </p>
          )}
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="/jobboard.svg"
            alt="Job board illustration"
            className="w-full max-w-xs md:max-w-sm drop-shadow-md"
          />
        </div>
      </div>


      <div className="border-t border-[#CED0D4] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-[#f0f2f5] border border-[#CED0D4] rounded-lg px-4 py-3 hover:shadow-md transition-shadow duration-200"
            >
              <span className="text-[#1877F2] text-xl">{item.icon}</span>
              <div>
                <p className="text-[#050505] font-bold text-sm leading-tight">{item.title}</p>
                <p className="text-[#65676B] text-xs">{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
