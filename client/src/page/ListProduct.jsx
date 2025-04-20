import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Pagination } from "antd";

import getAllProduct from "../services/productService/getAllProduct";
import Card from "../components/card/Card";
import { useLocation } from "react-router-dom";

const Product = () => {
  const location = useLocation();
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("ASC");
  const searchParams = new URLSearchParams(location.search);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProduct({
        keyword: searchParams.get("keyword"),
        page: page,
        sortBy: sortBy,
        sortOrder: sortOrder,
      });
      if (response?.data) {
        setProducts(response.data);
        setTotalItem(response.totalItem);
      }
    };
    fetchProducts();
  }, [location, page, sortBy, sortOrder]);
  return (
    <div className="w-full max-w-[1110px] mx-auto">
      <div className="mx-auto flex flex-col gap-3 items-center my-8">
        <div className="text-3xl font-semibold">Tìm kiếm</div>
        <div className="text-sm text-gray">Có 20 sản phẩm</div>
        <div className="w-[80px] h-1 bg-black"></div>
      </div>
      <div className="flex justify-between text-sm">
        <div className="flex gap-5">
          <div className="uppercase">Bộ lọc:</div>
          <div className="cursor-pointer">
            Màu sắc <IoMdArrowDropdown className="inline-block ml-1" />
          </div>
          <div className="cursor-pointer">
            Kích cỡ
            <IoMdArrowDropdown className="inline-block ml-1" />
          </div>
          <div className="cursor-pointer">
            Khoảng giá
            <IoMdArrowDropdown className="inline-block ml-1" />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="font-medium">Sắp xếp theo:</div>
          <select
            name=""
            id=""
            className="bg-transparent outline-0"
            onChange={(e) => {
              switch (e.target.value) {
                case "createdAt":
                  setSortBy("createdAt");
                  setSortOrder("ASC");
                  break;
                case "priceDown":
                  setSortBy("price");
                  setSortOrder("DESC");
                  break;
                case "priceUp":
                  setSortBy("price");
                  setSortOrder("ASC");
                  break;
              }
            }}
          >
            <option value="createdAt">Mới nhất</option>
            <option value="priceUp">Giá tăng dần</option>
            <option value="priceDown">Giá giảm dần</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-7 gap-y-12 py-8">
        {products?.map((value, index) => (
          <div className="bg-primary p-6 bg-opacity-20 rounded-2xl">
            <Card data={value} image={value?.product_images[0]?.path} />
          </div>
        ))}
      </div>
      <div className="py-5">
        <Pagination
          align="center"
          total={totalItem}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default Product;
