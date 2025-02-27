import React from "react";

const Input = ({ label, type = "text", className, register, errorMessage }) => {
  return (
    <div className={className}>
      <input
        type={type}
        className={`${className} bg-gray-light px-6 py-3 rounded-xl focus:outline-none`}
        placeholder={label}
        {...register}
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
export default Input;
