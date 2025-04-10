const Counter = ({ className, state, setState, onMinus, onPlus }) => {
  return (
    <div className={`flex h-[30px] ${className}`}>
      <div
        className="px-3 border rounded-tl-sm rounded-bl-sm cursor-pointer flex items-center"
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
        className="w-[60px] text-center font-normal border-t border-b [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-0"
      />
      <div
        className="px-3 border rounded-tr-sm rounded-br-sm cursor-pointer flex items-center"
        onClick={onPlus}
      >
        <div className="text-red">+</div>
      </div>
    </div>
  );
};

export default Counter;
