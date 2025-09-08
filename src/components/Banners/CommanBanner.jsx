import React from "react";
import { Heading, Row } from "../ComponentsIndex";

function CommanBanner({ heading, className = "" }) {
  return (
    <Row
      className={`relative w-full bg-[#fff4ea] py-12 md:py-10 ${className}`}
    >
      {/* Centered Heading */}
      <div className="flex items-center justify-center w-full">
        <Heading className="text-xl md:text-2xl lg:text-3xl font-semibold text-center px-4 text-black">
          {heading}
        </Heading>
      </div>
    </Row>
  );
}

export default CommanBanner;
