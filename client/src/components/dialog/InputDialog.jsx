const InputDialog = ({ label, register, error, readOnly }) => {
  return (
    <div className="w-full mb-4">
      <div className="relative w-full p-2 border">
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
          {...register}
          readOnly={readOnly}
        />
      </div>
      <div className="text-xs text-red-500 mt-2">{error}</div>
    </div>
  );
};

export default InputDialog;
