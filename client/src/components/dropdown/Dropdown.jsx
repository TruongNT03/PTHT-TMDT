import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = ({ list = [] }) => {
  const [orderShow, setOrderShow] = useState(false);
  const [searchValue, setSearchValue] = useState({
    name: "Order",
    orderBy: "desc",
  });
  const handleShow = () => {
    setOrderShow((prev) => !prev);
  };
  const handleClick = (value) => {
    if (searchValue.name !== value) {
      setSearchValue({
        name: value,
        orderBy: "desc",
      });
    } else if (searchValue.orderBy === "desc") {
      setSearchValue((prev) => ({ ...prev, orderBy: "asc" }));
    } else {
      setSearchValue((prev) => ({ ...prev, orderBy: "desc" }));
    }
  };
  return (
    <div
      className="relative flex items-center gap-1 border-[1px] p-1 rounded-lg cursor-pointer "
      onClick={handleShow}
    >
      <div>{searchValue.name}</div>
      <IoIosArrowDown
        className={`${
          searchValue.orderBy === "desc" ? "" : "rotate-180"
        } transition duration-300`}
      />
      <ul
        className={`${
          orderShow ? "max-h-[200px]" : "max-h-0"
        } absolute top-[40px] left-0 bg-white overflow-hidden rounded-lg transition-all ease-in-out duration-300`}
      >
        {list.map((value, index) => (
          <li
            key={index}
            className="w-full px-3 hover:bg-primary hover:text-secondary"
            onClick={() => {
              handleClick(value);
            }}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
