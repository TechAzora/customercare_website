import React from "react";

function Paragraph({ children, className }) {
  return <p className={`${className}`}>{children}</p>;
}

export default Paragraph;
