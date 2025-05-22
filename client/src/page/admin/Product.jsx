import { Button, Table, Pagination } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spin, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import getAllProduct from "../../services/productService/getAllProduct";
import deleteProduct from "../../services/productService/deleteProduct";

const { Search } = Input;
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (description) => (
      <div className="max-w-[400px] overflow-hidden truncate ">
        {description}
      </div>
    ),
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Category",
    dataIndex: ["category", "name"],
    key: "category",
  },
  {
    title: "Section",
    dataIndex: ["section", "name"],
    key: "section",
  },
  {
    title: "Images",
    dataIndex: ["product_images"],
    key: "images",
    render: (images) =>
      images?.length > 0 ? (
        <img
          src={process.env.REACT_APP_SERVER_URL + images[0].path}
          alt="Ảnh sản phẩm"
          style={{
            width: 30,
            height: 30,
            objectFit: "cover",
            borderRadius: "3px",
          }}
        />
      ) : (
        "Không có ảnh"
      ),
  },
  {
    title: "Action",
    dataIndex: "id",
    key: "id",
    render: (value) => (
      <div className="flex gap-3">
        <Link to={`/admin/product/edit/${value}`} className="text-blue-500">
          Sửa
        </Link>
        {/* <div
          className="text-red cursor-pointer"
          onClick={async () => {
            await deleteProduct(value);
          }}
        >
          Xóa
        </div> */}
      </div>
    ),
  },
];

const Product = () => {
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [totalPage, setTotalPage] = useState(1);
  const [totalItem, setTotalItem] = useState(1);
  const getData = async (keyword) => {
    const response = await getAllProduct({
      page: currentPage,
      keyword: keyword,
    });
    setCurrentPage(response?.currentPage);
    setTotalPage(response?.totalPage);
    setTotalItem(response?.totalItem);
    setData(response.data);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [currentPage]);
  return (
    <div className="w-full mt-5">
      <div className="w-full px-8">
        <div className="text-2xl font-semibold">Product</div>
        <div className="flex justify-between items-center">
          <Search
            className="w-[500px] my-5"
            onInput={(e) => {
              const keyword = e.target.value;
              if (keyword.length > 0) {
                getData(keyword);
              }
            }}
          />
          <Link to={"/admin/product/new"}>
            <Button type="primary">Create new</Button>
          </Link>
        </div>
        {data ? (
          <div>
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
              size="middle"
              className="bg-white rounded-xl p-5 pb-[50px]"
            />
            <Pagination
              align="end"
              defaultCurrent={currentPage}
              total={totalItem}
              onChange={(page) => {
                setCurrentPage(page);
              }}
              className="-mt-10 mr-4"
            />
          </div>
        ) : (
          <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            className="w-full mt-[350px] mx-auto"
          />
        )}
      </div>
    </div>
  );
};

export default Product;
