import React from "react";
import {
  MdOutlineDesignServices, MdOutlineWebhook,
  MdAccountBalance, MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, title: "Graphics & Design",       subTitle: "305 Open Positions",  icon: <MdOutlineDesignServices /> },
  { id: 2, title: "Data Engineer",   subTitle: "500 Open Positions",  icon: <TbAppsFilled /> },
  { id: 3, title: "Software Engineer", subTitle: "200 Open Positions"},
  { id: 4, title: "MERN Stack Development",   subTitle: "1000+ Open Positions",icon: <FaReact /> },
  { id: 5, title: "Account & Finance",        subTitle: "150 Open Positions",  icon: <MdAccountBalance /> },
  { id: 6, title: "AI Engineer",  subTitle: "867 Open Positions",  icon: <GiArtificialIntelligence /> },
  { id: 7, title: "Video Animation",          subTitle: "50 Open Positions",   icon: <MdOutlineAnimation /> },
  { id: 8, title: "Game Development",         subTitle: "80 Open Positions",   icon: <IoGameController /> },
];

const PopularCategories = () => {
  return (
    <section className="bg-[#f0f2f5] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#050505]">Popular Categories</h2>
          <p className="text-[#65676B] mt-2 text-sm">Explore jobs by category and find what suits you best</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              to="/job/getall"
              key={cat.id}
              className="flex items-center gap-3 bg-white border border-[#CED0D4] rounded-xl px-4 py-4 hover:shadow-md hover:border-[#1877F2] transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#E7F3FF] flex items-center justify-center text-[#1877F2] text-lg flex-shrink-0 group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
                {cat.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[#050505] font-semibold text-sm truncate">{cat.title}</p>
                <p className="text-[#65676B] text-xs mt-0.5">{cat.subTitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
