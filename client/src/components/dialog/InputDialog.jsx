import { useEffect, useState } from "react";

import getAllDropDown from "../../services/productService/getAllDropDown";

const InputDialog = ({
  type = "text",
  hasDropdown,
  name,
  label,
  register,
  errors,
  idInput,
  disabled,
}) => {
  const [listDropDown, setListDropDown] = useState([]);
  useEffect(() => {
    const handle = async () => {
      if (hasDropdown) {
        const response = await getAllDropDown(name);
        setListDropDown(response.data);
      } else {
        return;
      }
    };
    handle();
  }, []);
  return (
    <div className="relative">
      <div className="absolute text-sm text-red-500 left-0 -top-7">
        {errors?.name?.message}
      </div>
      {hasDropdown ? (
        <div className="relative w-full p-2 border outline-none rounded-sm my-4">
          <label
            htmlFor=""
            className="text-sm text-gray bg-white px-2 absolute top-[-12px] left-3"
          >
            {label}
          </label>
          <select name="" id="" className="w-full">
            {listDropDown.map((value, index) => (
              <option>{value?.name}</option>
            ))}
          </select>
        </div>
      ) : type === "file" ? (
        <div className="w-full border p-2 relative mb-4">
          <label
            htmlFor=""
            className="text-sm text-gray bg-white px-2 absolute top-[-12px] left-3"
          >
            {label}
          </label>
          <input type="file" className=""></input>
        </div>
      ) : (
        <div>
          <label
            htmlFor={idInput}
            className="text-sm text-gray bg-white px-2 absolute top-[-10px] left-3 transition-all peer-placeholder-shown:top-[10px] peer-placeholder-shown:bg-transparent"
          >
            {label}
          </label>
          <input
            type={type}
            id={idInput}
            className="w-full border py-2 px-3 outline-none mb-4 border-gray peer"
            placeholder=""
            {...register}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};

export default InputDialog;
