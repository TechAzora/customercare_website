import React from "react";

function Column({ children, className = "", ...props }) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
}

export default Column;
