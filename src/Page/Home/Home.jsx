import React from "react";
import Banners from "../../components/Banners/Banners";
import ServicesSlider from "../categories/Service";
import TipsGuides from "./Blog";


function Home() {


  return (
    <>
    
      <Banners />
     <ServicesSlider/>
     <TipsGuides/>
    </>
  );
}

export default Home;
