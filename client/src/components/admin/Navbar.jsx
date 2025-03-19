import { IoSearch } from "react-icons/io5";
import { FaBell } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="h-[80px] bg-white flex justify-end items-center gap-8 text-2xl pr-10 border-b-[1px] border-gray border-opacity-50">
      <IoSearch />
      <FaBell />
      <div className="border-[1px] w-fit h-fit p-1 rounded-lg text-base font-semibold flex items-center gap-1">
        <div>ADMIN</div>
        <IoIosArrowDown />
      </div>
    </div>
  );
};

export default Navbar;
