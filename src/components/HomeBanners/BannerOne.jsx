import React from "react";
import { ButtonWhite, Heading } from "../ComponentsIndex";
import { Link } from "react-router-dom";

const BannerOne = ({ heading, para, image, btn }) => {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="relative">
          {/* Directly display the image */}
          <img
            src={image}
            alt={heading}
            className="w-full h-[510px] lg:h-[533px] object-cover"
          />
          {/* Overlay div */}
          <div className="absolute inset-0 bg-[#3E056433]"></div>

          {/* Overlay text on the image */}
          <div className="absolute top-[30%] left-[10%] z-20 text-white">
            <Heading className="md:w-[40rem] text-3xl md:text-5xl lg:text-7xl text-white text-balance capitalize font-marcellus">
              {heading}
            </Heading>
            <Heading className="text-xl my-3 font-marcellus">{para}</Heading>
            <Link to={"/store"}>
              <ButtonWhite className="my-3">{btn}</ButtonWhite>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerOne;
