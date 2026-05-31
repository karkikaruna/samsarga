import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const steps = [
  {
    id: 1,
    icon: <FaUserPlus className="text-2xl" />,
    title: "Create an Account",
    desc: "Sign up to access job postings, set up your profile, and start applying to jobs that match your skills and interests.",
  },
  {
    id: 2,
    icon: <MdFindInPage className="text-2xl" />,
    title: "Find or Post a Job",
    desc: "Browse job listings posted by companies or post job openings if you're an employer seeking qualified candidates.",
  },
  {
    id: 3,
    icon: <IoMdSend className="text-2xl" />,
    title: "Apply or Recruit",
    desc: "Easily apply for jobs or manage candidate applications as an employer to find the best fit for your role.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-fb-surface py-14">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div key={step.id} className="fb-card p-6 flex flex-col gap-4 hover:shadow-fb-hover transition-shadow duration-200">
              <div className="w-12 h-12 rounded-full bg-fb-light flex items-center justify-center text-fb-primary">
                {step.icon}
              </div>
              <div>
                <p className="text-xs font-semibold text-fb-primary uppercase tracking-wide mb-1">
                  Step {step.id}
                </p>
                <h3 className="text-fb-text font-bold text-base mb-2">{step.title}</h3>
                <p className="text-fb-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
