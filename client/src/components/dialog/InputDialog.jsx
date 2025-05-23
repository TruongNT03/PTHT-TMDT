const InputDialog = ({ label, register, error, placeholder, className }) => {
  return (
    <div className={`w-full mb-4 ${className}`}>
      <label htmlFor={label} className="text-gray bg-white">
        {label}
      </label>
      <input
        id={label}
        className="w-full p-2 border-[2px] outline-none border-gray-light rounded-md break-words"
        placeholder={placeholder}
        {...register}
        type="text"
      />
      <div className="text-xs text-red-500 mt-2">{error}</div>
    </div>
  );
};

export default InputDialog;
