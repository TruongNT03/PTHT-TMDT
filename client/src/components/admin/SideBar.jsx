import { GrHomeRounded } from "react-icons/gr";
import { BsBox } from "react-icons/bs";
import { TbCategoryMinus } from "react-icons/tb";
import { AiOutlineUnorderedList } from "react-icons/ai";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SideBar = ({ className }) => {
  const [active, setActive] = useState([
    "border-l-secondary",
    "border-l-transparent",
    "border-l-transparent",
    "border-l-transparent",
  ]);
  const location = useLocation().pathname;
  useEffect(() => {
    if (location.endsWith("admin")) {
      setActive([
        "border-l-secondary",
        "border-l-transparent",
        "border-l-transparent",
        "border-l-transparent",
      ]);
    } else if (location.endsWith("product")) {
      setActive([
        "border-l-transparent",
        "border-l-secondary",
        "border-l-transparent",
        "border-l-transparent",
      ]);
    } else if (location.endsWith("category")) {
      setActive([
        "border-l-transparent",
        "border-l-transparent",
        "border-l-secondary",
        "border-l-transparent",
      ]);
    } else if (location.endsWith("section")) {
      setActive([
        "border-l-transparent",
        "border-l-transparent",
        "border-l-transparent",
        "border-l-secondary",
      ]);
    }
  }, [location]);

  return (
    <div className={`flex flex-col ${className} text-light font-normal`}>
      <div>
        <img
          src="https://bizweb.dktcdn.net/100/455/315/themes/894917/assets/logo.png?1724746453440"
          alt=""
          className="mt-8 ml-4"
        />
        <div className="mt-8 ml-4 text-sm font-bold text-light">General</div>
      </div>
      <div className="flex flex-col justify-start gap-4 mt-4">
        <Link
          to="/admin"
          className={`flex items-center ml-3 gap-3 px-4 py-1 ${active[0]} border-l-4`}
        >
          <GrHomeRounded />
          <div className="">Dashboard</div>
        </Link>
        <Link
          to="/admin/product"
          className={`flex items-center ml-3 gap-3 px-4 py-1 ${active[1]} border-l-4`}
        >
          <BsBox />
          <div>Product</div>
        </Link>
        <Link
          className={`flex items-center ml-3 gap-3 px-4 py-1 ${active[2]} border-l-4`}
        >
          <TbCategoryMinus />
          <div>Category</div>
        </Link>
        <Link
          className={`flex items-center ml-3 gap-3 px-4 py-1 ${active[3]} border-l-4`}
        >
          <AiOutlineUnorderedList />
          <div>Section</div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
