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
      type={type}
      className={`${className} w-full sm:w-auto bg-[#2b5f75] text-white px-4 sm:px-6 rounded-full text-xs sm:text-sm font-medium hover:bg-[#184950] transition h-[42px] sm:h-[48px] flex items-center justify-center gap-2`}
      {...props}
    >
      {icon && <i className={`bi bi-${icon} text-2xl`}></i>} {children}
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
      type={type}
      className={`${className} w-full sm:w-auto border border-[#2b5f75] text-[#2b5f75] px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#2b5f75] hover:text-white transition-colors h-[42px] sm:h-[48px] flex items-center justify-center gap-2`}
      {...props}
    >
      {icon && <i className={`bi bi-${icon}`}></i>} {children}
    </button>
  );
}

export { Button, ButtonWhite };
