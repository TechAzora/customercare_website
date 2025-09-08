import React, { useState } from "react";
import Banners from "../../components/Banners/Banners";
import ServicesSlider from "../categories/Service";
import PartnerServiceHome from "../categories/CompnayService";
import TipsGuides from "./Blog";

function Home() {
  const [activeTab, setActiveTab] = useState("individual");

  return (
    <>
      <Banners />

      {/* Heading + Toggle */}
      <div className="container w-full max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center px-6 mt-6">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Find Services Near You
          </h2>

          {/* Right Toggle */}
          <div className="flex bg-transparent rounded-full p-1 mt-3 md:mt-0 border">
            <button
              className={`px-6 py-2 rounded-full font-medium ${activeTab === "individual"
                  ? "bg-[#2B5F75] text-white shadow"
                  : "text-gray-600"
                }`}
              onClick={() => setActiveTab("individual")}
            >
              Individual
            </button>
            <button
              className={`px-6 py-2 rounded-full font-medium ${activeTab === "Partner"
                  ? "bg-[#2B5F75] text-white shadow"
                  : "text-gray-600"
                }`}
              onClick={() => setActiveTab("Partner")}
            >
              Partner
            </button>
          </div>
        </div>
      </div>


      {/* Conditional Rendering */}
      {activeTab === "individual" ? <ServicesSlider /> : <PartnerServiceHome />}

      <TipsGuides />
    </>
  );
}

export default Home;
