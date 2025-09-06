import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", name, placeholder, className = "", bodyclass = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className={`mb-4 ${bodyclass}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`block w-full px-3 py-2  focus:outline-none focus:ring-2 focus:ring-primary focus:border-custom-primary
           sm:text-sm my-2 border border-gray-200 rounded-lg ${className} h-[40px]`}
        id={id}
        ref={ref}
        name={name}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
});

export default Input;
