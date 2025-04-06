import Slider from "react-slick";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useParams } from "react-router";

import Navigate from "../components/navigate/Navigate";
import Button from "../components/button/Button";
import Counter from "../components/counter/Counter";
import getProductById from "../services/productService/getProductById";

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <IoIosArrowBack
      className={`${className} text-black hover:text-black`}
      onClick={onClick}
    />
  );
}
function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <IoIosArrowForward
      className={`${className} text-black hover:text-black`}
      onClick={onClick}
    />
  );
}

const ProductDetail = ({ className }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [variantSeclect, setVariantSelect] = useState({});
  const [choose, setChoose] = useState({});
  // console.log(data);
  // console.log(variantSeclect);
  // console.log(choose);
  const variant_of_product = {
    variant: new Set(),
  };
  data?.product_variants?.forEach((value1, index1) => {
    value1?.variant?.forEach((value2, index2) => {
      variant_of_product.variant.add(value2.name);
      if (!variant_of_product[value2.name]) {
        variant_of_product[value2.name] = new Set();
      }
      variant_of_product[value2.name].add(value2.value);
    });
  });

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  const [counter, setCounter] = useState(1);

  const findVariant = (variantSeclect = {}) => {
    const { product_variants = [] } = data;
    // Danh sach cac bien the da chon
    const value = Object.values(variantSeclect);
    // Duyet tung bien the san pham API tra ve
    for (const variant of product_variants) {
      // Dieu kien de ko bi loi
      if (variant.variant.length > 0) {
        // Duyet tung gia tri trong moi bien the san pham
        let check = true;
        for (const element of variant.variant) {
          // Neu danh sach da chon khong chua gia tri cua bien the san pham
          if (!value.includes(element.value)) {
            check = false;
          }
        }
        if (check) {
          return setChoose(variant);
        }
      }
    }
    return setChoose({});
  };
  const onMinus = () => {
    setCounter((prev) => prev - 1);
  };
  const onPlus = () => {
    setCounter((prev) => prev + 1);
  };
  useEffect(() => {
    const getData = async () => {
      const response = await getProductById(id);
      setData(response.data);
    };
    getData();
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, [id]);
  useEffect(() => {
    findVariant(variantSeclect);
    // eslint-disable-next-line
  }, [variantSeclect]);
  return (
    <div className="w-full max-w-[1110px] mx-auto py-10">
      <Navigate className={"w-full mb-4"} />
      <div className="w-full flex gap-5">
        <div className="flex-1 max-w-[600px]">
          <Slider
            arrows={false}
            asNavFor={nav2}
            ref={(slider) => (sliderRef1 = slider)}
          >
            {data?.product_images?.map((value, index) => {
              return (
                <div key={index} className="">
                  <img
                    src={process.env.REACT_APP_SERVER_URL + value.path}
                    alt=""
                    className=""
                  />
                </div>
              );
            })}
          </Slider>
          <Slider
            slidesToShow={5}
            nextArrow={<SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
            className="w-[500px] mx-auto"
            focusOnSelect={true}
            asNavFor={nav1}
            ref={(slider) => (sliderRef2 = slider)}
          >
            {data?.product_images?.map((value, index) => {
              return (
                <div className="px-2">
                  <img
                    src={process.env.REACT_APP_SERVER_URL + value.path}
                    alt=""
                    className="object-cover"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="flex-1">
          <div className="text-[22px] font-semibold mb-[10px]">{data.name}</div>
          <div className="flex items-center text-text mb-[20px]">
            <div className="flex-[1]">Có sẵn</div>
            <div className="flex flex-[4]">
              <div className="text-red mr-1">
                {choose?.stock || data?.stock}
              </div>{" "}
              Sản phẩm
            </div>
          </div>
          <div className="flex gap-5 text-red text-[28px] font-semibold bg-light-blue p-3 my-3">
            {choose?.old_price && (
              <div className="flex">
                <div className="text-lg leading-10">₫</div>
                <div className="">
                  {new Intl.NumberFormat().format(choose.old_price * 1000)}
                </div>
              </div>
            )}
            {choose?.price ? (
              <div className="flex text-slate-400 items-center">
                <div className="text-lg leading-10">₫</div>
                <div className="line-through font-normal">
                  {new Intl.NumberFormat().format(choose.price * 1000)}
                </div>
                <div className="bg-secondary text-sm font-light text-white px-1 ml-5">
                  Sale
                </div>
              </div>
            ) : (
              <div className="flex">
                <div className="text-lg leading-10 ">₫</div>
                <div>{new Intl.NumberFormat().format(data.price * 1000)}</div>
              </div>
            )}
          </div>
          {Array.from(variant_of_product.variant).map((name, index1) => (
            <div key={index1} className="flex mb-5">
              <div className="flex-[1]">{name}</div>
              <div className="flex flex-[4] gap-2 flex-wrap">
                {Array.from(variant_of_product[name]).map((value, index2) => (
                  <button
                    key={index2}
                    onClick={() => {
                      if (variantSeclect[name] === value) {
                        setVariantSelect((prev) => {
                          const obj = { ...prev };
                          delete obj[name];
                          return { ...obj };
                        });
                      } else {
                        setVariantSelect((prev) => ({
                          ...prev,
                          [name]: value,
                        }));
                      }
                      findVariant(variantSeclect);
                    }}
                    className={`border rounded-sm px-2 text-text ${
                      variantSeclect[name] === value
                        ? "border-secondary"
                        : "border-gray-light"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex mb-[40px]">
            <div className="flex-[1]">
              <img
                class="img-responsive"
                alt=""
                src="https://bizweb.dktcdn.net/100/455/315/themes/894917/assets/iamge_product2.png?1724746453440"
              />
            </div>

            <div className="flex-[4]">
              <div className="font-semibold">Miễn phí vận chuyển</div>
              <div>Cho đơn hàng từ 499.000đ</div>
            </div>
          </div>
          <div className="flex mb-[40px]">
            <div className="flex-1">
              <img
                class="img-responsive"
                alt=""
                src="https://bizweb.dktcdn.net/100/455/315/themes/894917/assets/iamge_product1.png?1724746453440"
              />
            </div>
            <div className="flex-[4]">
              <div className="font-semibold">Miễn phí đổi, sửa hàng</div>
              <div>
                Đổi hàng trong 30 ngày kể từ ngày mua Hỗ trợ sửa đồ miễn phí
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex-[1] mb-3 font-semibold">Số lượng</div>
            <Counter
              className={"mb-5 flex-[4]"}
              state={counter}
              onMinus={onMinus}
              onPlus={onPlus}
              setState={setCounter}
            />
          </div>

          <Button label={"Mua ngay"} className={"w-full mb-5"} />
          <Button
            label={"Thêm vào giỏ hàng"}
            className={"w-full"}
            variant="white"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
