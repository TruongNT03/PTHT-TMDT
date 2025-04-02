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
  console.log(data);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  const [counter, setCounter] = useState(1);
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
  }, []);
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
                <div className="">
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
          <div className="flex items-center text-[15px] font-light mb-[20px]">
            Mã Sp: <div className="m-1">Đang cập nhập</div>
          </div>
          <div className="flex text-red text-[28px] font-semibold mb-[40px]">
            <div>{new Intl.NumberFormat().format(data.price * 1000)}</div>Đ
          </div>
          <div className="flex gap-6 mb-[40px]">
            <img
              class="img-responsive"
              src="https://bizweb.dktcdn.net/100/455/315/themes/894917/assets/iamge_product2.png?1724746453440"
            />
            <div>
              <div className="font-semibold">Miễn phí vận chuyển</div>
              <div>Cho đơn hàng từ 499.000đ</div>
            </div>
          </div>
          <div className="flex gap-6 mb-[40px]">
            <img
              class="img-responsive"
              src="https://bizweb.dktcdn.net/100/455/315/themes/894917/assets/iamge_product1.png?1724746453440"
            />
            <div>
              <div className="font-semibold">Miễn phí vận chuyển</div>
              <div>Cho đơn hàng từ 499.000đ</div>
            </div>
          </div>
          <div className="mb-3">Số lượng:</div>
          <Counter
            className={"mb-5"}
            state={counter}
            onMinus={onMinus}
            onPlus={onPlus}
            setState={setCounter}
          />
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
