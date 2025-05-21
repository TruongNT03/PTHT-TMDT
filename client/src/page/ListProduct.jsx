import { useContext, useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Pagination } from "antd";

import getAllProduct from "../services/productService/getAllProduct";
import Card from "../components/card/Card";
import { useLocation, useSearchParams } from "react-router-dom";
import { LoadingContext } from "../contexts/LoadingContext";

const Product = () => {
  const location = useLocation();
  const [totalItem, setTotalItem] = useState(0);
  const { setLoading } = useContext(LoadingContext);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("ASC");
  const searchParams = new URLSearchParams(location.search);
  const [products, setProducts] = useState([]);
  const [params] = useSearchParams();
  const checkSetion = (section) => {
    switch (params.get("section")) {
      case "nam":
        return 1;
      case "nu":
        return 2;
      default:
        return undefined;
    }
  };
  const checkCategory = (category) => {
    switch (params.get("category")) {
      case "ao":
        return 1;
      case "quan":
        return 2;
      case "giay":
        return 3;
      case "phukien":
        return 4;
      default:
        return undefined;
    }
  };
  const section_id = checkSetion(params.get("section"));
  const category_id = checkCategory(params.get("category"));
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await getAllProduct({
        keyword: searchParams.get("keyword"),
        page: page,
        sortBy: sortBy,
        sortOrder: sortOrder,
        limit: 20,
        section_id,
        category_id,
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
        <div className="text-sm text-gray">Có {totalItem} sản phẩm</div>
        <div className="w-[80px] h-1 bg-black"></div>
      </div>
      <div className="flex justify-between text-sm">
        {/* <div className="flex gap-5">
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
        </div> */}
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
