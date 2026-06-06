import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </main>
  );
};

export default Home;
