const Counter = ({ className, state, setState, onMinus, onPlus }) => {
  return (
    <div className={`flex ${className}`}>
      <div
        className="p-3 border rounded-tl-md rounded-bl-md cursor-pointer"
        onClick={onMinus}
      >
        <div className="text-red">-</div>
      </div>
      {/* <div className="py-3 px-8 border-t border-b">{state}</div> */}
      <input
        type="number"
        value={state}
        onInput={(e) => {
          const value = e.target.value;
          setState(value === "" ? "" : Number(value));
        }}
        onBlur={(e) => {
          if (e.target.value === "") setState(1);
        }}
        className="w-[80px] py-3 text-center font-bold border-t border-b [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-0"
      />
      <div
        className="p-3 border rounded-tr-md rounded-br-md cursor-pointer"
        onClick={onPlus}
      >
        <div className="text-red">+</div>
      </div>
    </div>
  );
};

export default Counter;
