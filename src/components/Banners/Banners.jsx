import React from "react";
import { b1, b2 } from "../Img/ImportedImage";
import { Link } from "react-router-dom";
import { Button, ButtonWhite } from "../ComponentsIndex";

const BannerApi = () => {


  return (
<section className="w-full bg-gradient-to-b from-[#fff4ea] via-[#fff4ea] to-white py-12 md:py-20">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
    {/* === LEFT CONTENT === */}
    <div className="space-y-10">
      <h1 className="text-3xl md:text-5xl font-semibold leading-snug text-gray-900">
        Reliable Care for Your Loved Ones — Elders & Children, Anytime
      </h1>
      <p className="text-lg text-gray-600 text-balance">
        Certified caregivers and trusted creche services, just a click away.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <Link to="/login">
          <Button children={"Sign Up & Book Now"} />
        </Link>
        <Link to="/service">
          <ButtonWhite children={"Explore Services Near Me"} />
        </Link>
      </div>
    </div>

    {/* === RIGHT IMAGES === */}
    <div className="relative w-full flex justify-center items-start">
      {/* Top Image */}
      <div className="relative inline-block">
        <img
          src={b1}
          alt="Elder care"
          className="rounded-lg w-[450px] h-auto"
        />
      </div>
    </div>
  </div>
</section>


  );
};

export default BannerApi;
