import { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Accordion = ({ children, title }) => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef(null);

  useEffect(() => {
    if (isDisplay && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isDisplay]);

  return (
    <div>
      <div
        className={`flex items-center mt-5 p-1 cursor-pointer text-lg transition-all duration-500 ${
          isDisplay ? "bg-gray-light" : ""
        }`}
        onClick={() => setIsDisplay((prev) => !prev)}
      >
        {title}
        <MdKeyboardArrowDown
          className={`ml-2 text-xl transition-transform duration-500 ${
            isDisplay ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        ref={contentRef}
        style={{
          maxHeight: maxHeight,
          overflow: "hidden",
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        <div className="pt-2">{children}</div>
      </div>

      {isDisplay && (
        <div
          className="flex items-center mt-5 cursor-pointer text-base"
          onClick={() => setIsDisplay(false)}
        >
          Thu gọn
          <MdKeyboardArrowDown className="ml-2 text-lg rotate-180" />
        </div>
      )}
    </div>
  );
};

export default Accordion;
