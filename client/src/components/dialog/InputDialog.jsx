const InputDialog = ({ name, label, register, errors, disabled }) => {
  return (
    <div className="relative w-full p-2 border my-4">
      <label
        htmlFor={label}
        className="text-sm text-gray bg-white px-2 absolute top-[-10px] left-3 transition-all peer-placeholder-shown:top-[10px] peer-placeholder-shown:bg-transparent"
      >
        {label}
      </label>
      <input
        id={label}
        className="w-full px-2 outline-none border-gray peer"
        placeholder=""
        {...register(name)}
        disabled={disabled}
      />
    </div>
  );
};

export default InputDialog;
