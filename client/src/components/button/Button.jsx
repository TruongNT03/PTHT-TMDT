const Button = ({ label, variant = "green" }) => {
  const baseStyles =
    "flex items-center justify-center h-full w-full font-bold hover:bg-secondary text-[18px] rounded-xl";
  const variants = {
    green: "bg-primary text-white",
    white:
      "bg-white text-primary border border-primary hover:border-transparent hover:bg-primary hover:text-white",
    black: "bg-dark hover:bg-primary text-white",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>{label}</button>
  );
};

export default Button;
