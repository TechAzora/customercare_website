import React from "react";

function Img({ children, className = "", ...props }) {
  return (
    <>
      <img
        src={children}
        alt=""
        className={`${className} object-fit: cover`}
        {...props}
      />
    </>
  );
}

export default Img;
