const Button = ({ label, variant = "green", type = "submit", className }) => {
  const baseStyles =
    "w-full flex items-center justify-center h-full hover:bg-secondary text-[18px] rounded-xl py-3";
  const variants = {
    green: "bg-primary text-white",
    white:
      "bg-white text-primary border border-primary hover:border-transparent hover:bg-primary hover:text-white",
    black: "bg-dark hover:bg-primary text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
