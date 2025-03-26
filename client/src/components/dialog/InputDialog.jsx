const InputDialog = ({
  label,
  register,
  error,
  readOnly,
  placeholder,
  className,
}) => {
  return (
    <div className={`w-full mb-4 ${className}`}>
      <label htmlFor={label} className="text-gray bg-white">
        {label}
      </label>
      <input
        id={label}
        className="w-full h-full p-2 border-[2px] outline-none border-gray-light rounded-md"
        placeholder={placeholder}
        {...register}
        readOnly={readOnly}
      />

      <div className="text-xs text-red-500 mt-2">{error}</div>
    </div>
  );
};

export default InputDialog;
