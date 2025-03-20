import React from "react";

const DropDownDialog = ({
  label,
  name,
  listDropDown = [],
  register,
  setValue,
  getValues,
}) => {
  return (
    <div className="relative w-full p-2 border my-4">
      <label
        htmlFor={label}
        className="text-sm text-gray bg-white px-2 absolute top-[-12px] left-3"
      >
        {label}
      </label>
      <select
        id={label}
        className="w-full outline-none"
        onChange={(e) => {
          const index = e.target.selectedIndex;
          setValue(`${name}.`, {
            id: listDropDown[index].id,
            name: listDropDown[index].name,
          });
        }}
      >
        {listDropDown.map((value, index) => (
          <option key={index}>{value?.name}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDownDialog;
