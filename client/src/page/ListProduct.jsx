import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Pagination } from "antd";

import getAllProduct from "../services/productService/getAllProduct";
import Card from "../components/card/Card";

const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProduct();
      if (response?.data) {
        setProducts(response.data);
      }
    };
    fetchProducts();
  }, []);
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
          <select name="" id="" className="bg-transparent outline-0">
            <option value="">Mới nhất</option>
            <option value="">Giá tăng dần</option>
            <option value="">Giá giảm dần</option>
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
        <Pagination align="center" />
      </div>
    </div>
  );
};

export default Product;
