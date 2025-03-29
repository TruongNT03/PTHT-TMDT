const TextArea = ({ label, register, error, placeholder, className }) => {
  return (
    <div className={`w-full mb-4 ${className}`}>
      <label htmlFor={label} className="text-gray bg-white">
        {label}
      </label>
      <textarea
        id={label}
        className="w-full h-full p-2 border-[2px] outline-none border-gray-light rounded-md break-words resize-none"
        placeholder={placeholder}
        {...register}
      />
      <div className="text-xs text-red-500 mt-2">{error}</div>
    </div>
  );
};

export default TextArea;
