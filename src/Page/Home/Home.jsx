import React from "react";
import Banners from "../../components/Banners/Banners";
import ServicesSlider from "../categories/Service";
import TipsGuides from "./Blog";
import CompanyServiceHome from "../categories/CompnayService";


function Home() {


  return (
    <>

      <Banners />
      <ServicesSlider />
      <CompanyServiceHome />
      <TipsGuides />
    </>
  );
}

export default Home;
