import { useContext } from "react";
import { Pagination } from "antd";

import { ProductContext } from "../../contexts/ProductContext";
import Search from "../search/Search";
import Dropdown from "../dropdown/Dropdown";
import Table from "./Table";

const TableContainer = ({ head = [], title = "" }) => {
  const { data, setDialogData, setSearchParams, setVisible } =
    useContext(ProductContext);
  return (
    <div className="w-[96%] relative bg-secondary bg-opacity-50 mx-auto px-5 pt-5 pb-12 rounded-xl mt-5">
      <div className="flex justify-between border-b-[1px] border-black border-opacity-20 pb-4 mb-4">
        <div className="text-2xl font-bold">{title}</div>
        <div className="flex items-center gap-5">
          <Search />
          <Dropdown list={head} />
          <div
            className="bg-primary bg-opacity-70 text-white border-[1px] border-black p-1 rounded-lg cursor-pointer"
            onClick={() => {
              setDialogData({
                id: "",
                name: "",
                description: "",
                price: "",
                stock: "",
                image: "",
                subCategoryId: 1,
                sectionId: 1,
              });
              setVisible(true);
            }}
          >
            Insert
          </div>
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
