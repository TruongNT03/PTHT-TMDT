import { useContext } from "react";
import { Pagination } from "antd";

import { ProductContext } from "../../contexts/ProductContext";
import Search from "../search/Search";
import Dropdown from "../dropdown/Dropdown";
import Table from "./Table";
import { Link } from "react-router-dom";

const TableContainer = ({ head = [], title = "" }) => {
  const { data, setSearchParams } = useContext(ProductContext);
  return (
    <div className="w-[96%] relative bg-secondary bg-opacity-50 mx-auto px-5 pt-5 pb-12 rounded-xl mt-5">
      <div className="flex justify-between border-b-[1px] border-black border-opacity-20 pb-4 mb-4">
        <div className="text-2xl font-bold">{title}</div>
        <div className="flex items-center gap-5">
          <Search />
          <Dropdown list={head} />
          <Link
            to={"/admin/product/new"}
            className="bg-primary bg-opacity-70 text-white border-[1px] border-black p-1 rounded-lg cursor-pointer"
          >
            Insert
          </Link>
        </div>
      </div>
      <Table head={head} />
      <div className="mt-5 relative">
        <Pagination
          current={data?.currentPage}
          total={data?.totalItem}
          pageSize={10}
          showSizeChanger={false}
          showQuickJumper={true}
          className="absolute right-0"
          onChange={async (page) => {
            setSearchParams({ page: page });
          }}
        />
      </div>
    </div>
  );
};

export default TableContainer;
