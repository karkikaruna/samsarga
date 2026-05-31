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
  { id: 2, title: "Mobile App Development",  subTitle: "500 Open Positions",  icon: <TbAppsFilled /> },
  { id: 3, title: "Frontend Web Dev",         subTitle: "200 Open Positions",  icon: <MdOutlineWebhook /> },
  { id: 4, title: "MERN Stack Dev",           subTitle: "1,000+ Positions",    icon: <FaReact /> },
  { id: 5, title: "Account & Finance",        subTitle: "150 Open Positions",  icon: <MdAccountBalance /> },
  { id: 6, title: "Artificial Intelligence",  subTitle: "867 Open Positions",  icon: <GiArtificialIntelligence /> },
  { id: 7, title: "Video Animation",          subTitle: "50 Open Positions",   icon: <MdOutlineAnimation /> },
  { id: 8, title: "Game Development",         subTitle: "80 Open Positions",   icon: <IoGameController /> },
];

const PopularCategories = () => {
  return (
    <section className="bg-fb-panel py-14 border-t border-fb-border">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              to="/job/getall"
              key={cat.id}
              className="fb-card p-4 flex items-center gap-3 hover:shadow-fb-hover hover:border-fb-primary/30 transition-all duration-200 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-fb-light flex items-center justify-center text-fb-primary text-xl group-hover:bg-fb-primary group-hover:text-white transition-colors duration-200 flex-shrink-0">
                {cat.icon}
              </div>
              <div className="min-w-0">
                <p className="text-fb-text font-semibold text-sm leading-tight truncate">{cat.title}</p>
                <p className="text-fb-muted text-xs mt-0.5">{cat.subTitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
