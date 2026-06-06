import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const steps = [
  {
    icon: <FaUserPlus className="text-2xl text-[#1877F2]" />,
    title: "Create an Account",
    desc: "Sign up to access job postings, set up your profile, and start applying to jobs that match your skills and interests.",
    step: "01",
  },
  {
    icon: <MdFindInPage className="text-2xl text-white" />,
    title: "Find a Job or Post a Job",
    desc: "Browse job listings posted by companies or post job openings if you're an employer seeking candidates.",
    step: "02",
    dark: true,
  },
  {
    icon: <IoMdSend className="text-2xl text-[#1877F2]" />,
    title: "Apply or Recruit Candidates",
    desc: "Easily apply for jobs or manage candidate applications as an employer to find the perfect fit for your role.",
    step: "03",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white border-t border-b border-[#CED0D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#050505]">How It Works</h2>
          <p className="text-[#65676B] mt-2 text-sm">Get started in three simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className={`relative rounded-xl p-8 flex flex-col items-center text-center gap-4 border ${
                s.dark
                  ? "bg-[#18191c] border-[#18191c] text-white"
                  : "bg-[#f0f2f5] border-[#CED0D4] text-[#050505]"
              }`}
            >
              <span className={`absolute top-4 right-5 text-xs font-bold ${s.dark ? "text-[#65676B]" : "text-[#CED0D4]"}`}>
                {s.step}
              </span>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${s.dark ? "bg-[#2e2f33]" : "bg-[#E7F3FF]"}`}>
                {s.icon}
              </div>
              <h3 className={`font-semibold text-base ${s.dark ? "text-white" : "text-[#050505]"}`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed ${s.dark ? "text-[#b0b3b8]" : "text-[#65676B]"}`}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
