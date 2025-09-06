import React from "react";

function Row({ children, className = "", ...props }) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
}

export default Row;
