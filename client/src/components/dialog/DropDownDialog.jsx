const DropDownDialog = ({ label, listDropDown = [], error, register }) => {
  return (
    <div className="w-full mb-4">
      <div className="relative w-full p-2 border">
        <label
          htmlFor={label}
          className="text-sm text-gray bg-white px-2 absolute top-[-12px] left-3"
        >
          {label}
        </label>
        <select
          id={label}
          className="w-full outline-none"
          {...register}
          // onChange={(e) => {
          //   const index = e.target.selectedIndex;
          //   setValue(`${name}.`, {
          //     id: listDropDown[index].id,
          //     name: listDropDown[index].name,
          //   });
          // }}
        >
          {listDropDown.map((value, index) => (
            <option key={index} value={value?.id}>
              {value?.name}
            </option>
          ))}
        </select>
      </div>
      <div className="text-xs text-red-500">{error}</div>
    </div>
  );
};

export default DropDownDialog;
