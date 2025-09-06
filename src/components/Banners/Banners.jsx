import React from "react";
import { b1,b2 } from "../Img/ImportedImage";
import { Link } from "react-router-dom";

const BannerApi = () => {
 

  return (
    <section className="w-full bg-[#fff4ea]  py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* === LEFT CONTENT === */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-semibold leading-snug text-gray-900">
            Reliable Care for Your Loved Ones — Elders & Children, Anytime
          </h1>
          <p className="text-lg text-gray-600">
            Certified caregivers and trusted creche services, just a click away.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link to="/login">
            <button className="bg-[#205c64] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#17434a] transition-colors">
              Sign Up & Book Now
            </button></Link>
             <Link to="/service">
            <button className="border border-[#205c64] text-[#205c64] px-6 py-3 rounded-full hover:bg-[#205c64] hover:text-white transition-colors">
              Explore Services Near Me
            </button></Link>
          </div>
        </div>

        {/* === RIGHT IMAGES === */}
     <div className="relative w-full flex justify-center pt-10">
  {/* Top Image */}
  <div className="relative inline-block">
    <img
      src={b1}
      alt="Elder care"
      className="rounded-lg shadow-md w-[400px] h-auto"
    />

    {/* Decorative Shape */}
    <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#205c64] rounded-full flex items-center justify-center text-white font-bold">
      *
    </div>

    {/* Bottom Image (overlapping at bottom-right) */}
    <div className="md:absolute -bottom-10 md:-right-10 md:block hidden">
      <img
        src={b2}
        alt="Children care"
        className="rounded-lg shadow-md w-[300px] h-auto"
      />
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default BannerApi;
