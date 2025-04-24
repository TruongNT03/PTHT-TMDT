import { useState } from "react";

const Counter = ({
  className,
  defaultValue = 1,
  max = 999,
  onMinusClick,
  onPlusClick,
}) => {
  const [number, setNumber] = useState(defaultValue);
  // const onMinus = () => {
  //   setNumber((prev) => prev - 1);
  // };
  // const onPlus = () => {
  //   setNumber((prev) => prev + 1);
  // };
  const handleMinus = async () => {
    if (number > 1) {
      const newNumber = number - 1;
      setNumber(newNumber);
      if (onMinusClick) onMinusClick(newNumber);
    }
  };

  const handlePlus = async () => {
    if (number < max) {
      const newNumber = number + 1;
      setNumber(newNumber);
      if (onPlusClick) onPlusClick(newNumber);
    }
  };
  return (
    <div className={`flex h-[30px] ${className}`}>
      <div
        className={`px-3 ${
          number <= 1 ? "bg-gray bg-opacity-20" : ""
        }  border rounded-tl-sm rounded-bl-sm flex items-center ${
          number <= 1 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={number <= 1 ? () => {} : handleMinus}
      >
        <div className="font-bold text-red">-</div>
      </div>
      {/* <div className="py-3 px-8 border-t border-b">{state}</div> */}
      <input
        type="number"
        value={number}
        onInput={(e) => {
          const value = e.target.value;
          if (Number(value) > max) {
            setNumber(Number(value));
            if (onMinusClick) onMinusClick(Number(value));
          }
          setNumber(value === "" ? "" : Number(value));
        }}
        onBlur={(e) => {
          if (e.target.value === "") {
            setNumber(1);
            if (onMinusClick) onMinusClick(1);
          } else if (e.target.value > max) {
            setNumber(max);
            if (onMinusClick) onMinusClick(1);
          } else if (e.target.value < 1) {
            setNumber(1);
            if (onMinusClick) onMinusClick(1);
          }
        }}
        className="w-[60px] text-center font-normal border-t border-b [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-0"
      />
      <div
        className={`px-3 border rounded-r-sm flex items-center ${
          number >= max
            ? "cursor-not-allowed bg-gray bg-opacity-20"
            : "cursor-pointer"
        }`}
        onClick={number < max ? handlePlus : () => {}}
      >
        <div className="text-red font-bold">+</div>
      </div>
    </div>
  );
};

export default Counter;
