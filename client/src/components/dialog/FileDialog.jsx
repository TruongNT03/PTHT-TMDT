import React from "react";

const FileDialog = ({ label, name, register }) => {
  return (
    <div className="w-full border p-2 relative mb-4">
      <label
        htmlFor={label}
        className="text-sm text-gray bg-white px-2 absolute top-[-12px] left-3"
      >
        {label}
      </label>
      <input id={label} type="file" className="" {...register(name)}></input>
    </div>
  );
};

export default FileDialog;
