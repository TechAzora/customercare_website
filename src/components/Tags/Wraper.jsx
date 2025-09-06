import React from "react";

function Wrapper({ children, className = "", ...props }) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
}

export default Wrapper;
