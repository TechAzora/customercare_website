import React from "react";

function Button({
  children,
  type = "button",
  className = "",
  icon = "",
  ...props
}) {
  return (
    <button
      className={`${className} text-primary py-2 px-6 rounded-full duration-300 border border-primary`}
      {...props}
    >
      <i className={`bi bi-${icon}`}></i> {children}
    </button>
  );
}

function ButtonWhite({
  children,
  type = "button",
  className = "",
  icon = "",
  ...props
}) {
  return (
    <button
      className={`${className} text-custom-purple py-2 px-6 rounded-full duration-300 border border-white hover:bg-white hover:text-custom-purple bg-white`}
      {...props}
    >
      <i className={`bi bi-${icon}`}></i> {children}
    </button>
  );
}

export { Button, ButtonWhite };
