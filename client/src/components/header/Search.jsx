import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center text-sm bg-white rounded-full h-[44px] relative">
      <div className="pl-[32px] pr-[30px]">Tất cả</div>
      <div
        className="bg-[url(https://bizweb.dktcdn.net/100/455/315/themes/894917/assets/down-search.svg?1723540086975)] w-[17px] h-[36px] block cursor-pointer"
        onClick={() => {
          setShow((prev) => !prev);
        }}
      ></div>
      {show ? (
        <ul className="absolute top-[44px] w-fit px-4 py-2 bg-white rounded-lg max-h-[400px] overflow-y-auto scroll">
          <li>Sản phẩm khuyễn mãi</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>Sản phẩm khuyễn mãi</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>Sản phẩm khuyễn mãi</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>Sản phẩm khuyễn mãi</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      ) : (
        <></>
      )}

      <input
        type="text"
        placeholder="Tìm sản phẩm bạn mong muốn"
        className="w-[310px] bg-transparent px-2"
      />
      <div className="bg-[#FE9614] px-5 rounded-r-full  h-[44px] text-[20px] text-white flex items-center">
        {/* <FaSearch /> */}
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Search;
