const InputDialog = ({
  type = "text",
  label,
  register,
  errors,
  idInput,
  disabled,
}) => {
  return (
    <div className="relative">
      <div className="absolute text-sm text-red-500 left-0 -top-7">
        {errors?.name?.message}
      </div>
      <input
        type={type}
        id={idInput}
        className="w-full border py-2 px-3 outline-none mb-8 border-gray peer"
        placeholder=""
        {...register}
        disabled={disabled}
      />
      <label
        htmlFor={idInput}
        className="text-sm text-gray bg-white px-2 absolute top-[-10px] left-3 transition-all peer-placeholder-shown:top-[10px] peer-placeholder-shown:bg-transparent"
      >
        {label}
      </label>
    </div>
  );
};

export default InputDialog;
