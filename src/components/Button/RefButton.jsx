import React from 'react';

const Button = React.forwardRef(({
  children,
  type = "button",
  bgColor = "primary",
  textColor = "white",
  className = "",
  icon = "",
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={`btn btn-${bgColor} text-${textColor} ${className}`}
      {...props}
    >
      {icon && <i className={`bi bi-${icon}`}></i>} {children}
    </button>
  );
});

export default Button;
