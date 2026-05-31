import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

const companies = [
  { id: 1, title: "Microsoft", location: "Redmond, WA, USA",     openPositions: 10, icon: <FaMicrosoft /> },
  { id: 2, title: "Tesla",     location: "Austin, TX, USA",       openPositions: 5,  icon: <SiTesla /> },
  { id: 3, title: "Apple",     location: "Cupertino, CA, USA",    openPositions: 20, icon: <FaApple /> },
];

const PopularCompanies = () => {
  return (
    <section className="bg-fb-surface py-14 border-t border-fb-border">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title">Top Companies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {companies.map((company) => (
            <div key={company.id} className="fb-card p-5 hover:shadow-fb-hover transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-fb-light flex items-center justify-center text-fb-primary text-2xl">
                  {company.icon}
                </div>
                <div>
                  <p className="text-fb-text font-bold text-base">{company.title}</p>
                  <p className="text-fb-muted text-xs">{company.location}</p>
                </div>
              </div>
              <Link
                to="/job/getall"
                className="flex items-center justify-between w-full bg-fb-light hover:bg-fb-primary hover:text-white text-fb-primary text-sm font-semibold px-4 py-2 rounded-md transition-colors duration-150"
              >
                <span>{company.openPositions} Open Positions</span>
                <FiExternalLink className="text-base" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;
