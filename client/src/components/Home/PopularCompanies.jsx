import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { Link } from "react-router-dom";

const companies = [
  { id: 1, title: "Microsoft", location: "Redmond, WA — USA",      openPositions: 10, icon: <FaMicrosoft /> },
  { id: 2, title: "Tesla",     location: "Austin, TX — USA",        openPositions: 5,  icon: <SiTesla /> },
  { id: 3, title: "Apple",     location: "Cupertino, CA — USA",     openPositions: 20, icon: <FaApple /> },
];

const PopularCompanies = () => {
  return (
    <section className="bg-white border-t border-[#CED0D4] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#050505]">Top Companies Hiring</h2>
          <p className="text-[#65676B] mt-2 text-sm">Join some of the world's most innovative companies</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-[#f0f2f5] border border-[#CED0D4] rounded-xl p-6 flex flex-col gap-4 hover:shadow-md hover:border-[#1877F2] transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-[#E7F3FF] flex items-center justify-center text-[#1877F2] text-xl">
                  {company.icon}
                </div>
                <div>
                  <p className="text-[#050505] font-semibold text-sm">{company.title}</p>
                  <p className="text-[#65676B] text-xs mt-0.5">{company.location}</p>
                </div>
              </div>
              <Link
                to="/job/getall"
                className="w-full bg-[#E7F3FF] hover:bg-[#1877F2] text-[#1877F2] hover:text-white font-semibold text-sm py-2 rounded-md text-center transition-colors duration-200"
              >
                {company.openPositions} Open Position{company.openPositions !== 1 ? "s" : ""}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;