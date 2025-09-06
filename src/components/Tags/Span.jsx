import React from "react";

function Span({ children, className }) {
  return <span className={`${className}`}>{children}</span>;
}

export default Span;
