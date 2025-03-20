import { useContext, useEffect, useRef, useState } from "react";
import { Pagination } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

import Head from "./Head";
import Body from "./Body";
import { ProductContext } from "../../contexts/ProductContext";
import { getAllProduct } from "../../services/productService/getAllProduct";

const Table = ({ head = [] }) => {
  const { data, setIsClose, setDialogData, setData } =
    useContext(ProductContext);
  const [orderShow, setOrderShow] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState({
    name: "Order",
    orderBy: "desc",
  });
  const inputRef = useRef(null);
  const handleSearchActive = () => {
    setSearchActive((prev) => !prev);
  };
  const handleShow = () => {
    setOrderShow((prev) => !prev);
  };
  const handleClick = (value) => {
    if (value === searchValue.name) {
      if (searchValue.orderBy === "desc") {
        setSearchValue({ name: value, orderBy: "asc" });
      } else {
        setSearchValue({ name: value, orderBy: "desc" });
      }
    } else {
      setSearchValue({ name: value, orderBy: "desc" });
    }
  };
  useEffect(() => {
    if (searchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchActive]);
  return (
    <div className="w-[96%] relative bg-secondary bg-opacity-50 mx-auto px-5 pt-5 pb-12 rounded-xl mt-5">
      <div className="flex justify-between border-b-[1px] border-black border-opacity-20 pb-4 mb-4">
        <div className="text-2xl font-bold">Recent Purchases</div>
        <div className="flex items-center gap-5">
          <div
            className={`relative ${
              searchActive ? "w-[300px]" : "w-[30px]"
            } transition-all duration-200`}
          >
            <input
              ref={inputRef}
              type="text"
              disabled={!searchActive}
              autoFocus={!searchActive}
              className="w-full outline-0 px-3 py-1 rounded-lg disabled:bg-white"
              placeholder={searchActive ? "Search..." : ""}
            />
            <IoSearch
              className="absolute right-2 top-0 translate-y-1/2 cursor-pointer"
              onClick={handleSearchActive}
            />
          </div>
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
              {head.map((value, index) => (
                <li
                  key={index}
                  className="w-full px-3 hover:bg-primary hover:text-secondary"
                  onClick={() => {
                    handleClick(value.label);
                  }}
                >
                  {value.label}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="bg-primary bg-opacity-70 text-white border-[1px] border-black p-1 rounded-lg cursor-pointer"
            onClick={() => {
              setDialogData(undefined);
              setIsClose((prev) => !prev);
            }}
          >
            Insert
          </div>
        </div>
      </div>
      <table className="w-full table-auto bg-transparent rounded-sm">
        <Head head={head} />
        <Body />
      </table>
      <div className="mt-5 relative">
        <Pagination
          current={data?.currentPage}
          total={data?.totalItem}
          pageSize={10}
          showSizeChanger={false}
          showQuickJumper={true}
          className="absolute right-0"
          onChange={async (page) => {
            const responese = await getAllProduct(page);
            setData(responese);
          }}
        />
      </div>
    </div>
  );
};

export default Table;
