import { useEffect, useRef, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import useDebounce from "../../hooks/useDebounce";
import getAllProduct from "../../services/productService/getAllProduct";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const inputRef = useRef();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };
  const debouncedKeyword = useDebounce(keyword, 500);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProduct({ keyword: debouncedKeyword });
      if (res?.data) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
    };
    if (debouncedKeyword && debouncedKeyword.trim().length > 0) {
      fetchProducts();
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [debouncedKeyword]);
  return (
    <div className="flex w-fit items-center text-sm h-[44px] relative">
      <input
        type="text"
        placeholder="Tìm sản phẩm bạn mong muốn"
        className="w-[400px] px-8 outline-none bg-white py-3 rounded-l-full"
        value={keyword}
        onChange={handleChange}
        ref={inputRef}
        onBlur={() => setIsShow(false)}
        onFocus={() => setIsShow(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/product?keyword=${keyword}`);
            setIsShow(false);
            inputRef.current.blur();
          }
        }}
      />
      {keyword && (
        <IoMdClose
          className="absolute right-20 cursor-pointer"
          onClick={() => {
            setKeyword("");
            setProducts([]);
          }}
        />
      )}
      <div className="bg-[#FE9614] hover:bg-opacity-50 px-5 rounded-r-full  h-[44px] text-[20px] text-white flex items-center justify-center cursor-pointer">
        <RiSearch2Line
          className="text-2xl"
          onClick={() => {
            navigate(`/product?keyword=${keyword}`);
          }}
        />
      </div>
      {isShow && (
        <div className="absolute top-[50px] bg-light-blue w-full max-h-[300px] overflow-auto rounded-b-lg z-50">
          {products?.map(
            (product, index) =>
              index <= 5 && (
                <div
                  className="text-text  hover:bg-blue-300 cursor-pointer"
                  key={index}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    setIsShow(false);
                    inputRef.current.blur();
                  }}
                >
                  <div className="flex items-center gap-5 p-4 cursor-pointer">
                    <img
                      src={
                        process.env.REACT_APP_SERVER_URL +
                        product.product_images[0].path
                      }
                      alt={product.name}
                      className="w-[50px] h-[50px] object-cover rounded-lg"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">{product.name}</span>
                      <span className="text-gray-500">{product.price}</span>
                    </div>
                  </div>
                </div>
              )
          )}
          {products.length > 0 && (
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                navigate(`/product?keyword=${keyword}`);
                setIsShow(false);
                inputRef.current.blur();
              }}
              className="w-full bg-secondary py-2 text-center cursor-pointer"
            >
              Xem thêm
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
