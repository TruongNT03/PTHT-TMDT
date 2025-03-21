import React from "react";

const FileDialog = ({ label, register, error }) => {
  return (
    <div className="w-full mb-4">
      <div className="w-full border p-2 relative">
        <label
          htmlFor={label}
          className="text-sm text-gray bg-white px-2 absolute top-[-12px] left-3"
        >
          {label}
        </label>
        <input id={label} type="file" className="" {...register}></input>
      </div>
      <div className="text-xs text-red-500">{error}</div>
    </div>
  );
};

export default FileDialog;
