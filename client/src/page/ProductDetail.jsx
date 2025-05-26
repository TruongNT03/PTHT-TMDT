import Slider from "react-slick";
import { useState, useRef, useEffect, useContext } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import Cookies from "js-cookie";
import { Bounce, toast, ToastContainer } from "react-toastify";

import Navigate from "../components/navigate/Navigate";
import Button from "../components/button/Button";
import Counter from "../components/counter/Counter";
import getProductById from "../services/productService/getProductById";
import getRecommnedProduct from "../services/productService/getRecommned";
import { addToCart } from "../services/cart";
import { HeaderContext } from "../contexts/HeaderContext";
import Accordion from "../components/accordion/Accordion";
import { CartToCheckoutContext } from "../contexts/CartToCheckoutContext";
import { LoadingContext } from "../contexts/LoadingContext";
import Section from "../components/section/Section";
import Card from "../components/card/Card";

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
  const { getCart } = useContext(HeaderContext);
  // eslint-disable-next-line
  const { selected, setSelected } = useContext(CartToCheckoutContext);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [variantSeclect, setVariantSelect] = useState({});
  const [availableAttributes, setAvailableAttributes] = useState([]);
  const [choose, setChoose] = useState();
  const [message, setMessage] = useState("");
  const [stock, setStock] = useState();
  const [counter, setCounter] = useState(1);
  const [recommend, setRecommend] = useState([]);
  const { setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
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
  const imageRef = useRef(null);
  const onMinusClick = (value) => {
    setCounter(value);
  };
  const onPlusClick = (value) => {
    setCounter(value);
  };

  // const onBuy = () => {
  //   const token = Cookies.get("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  //   if (choose === undefined) {
  //     return setMessage("Vui lòng chọn phân loại sản phẩm!");
  //   }
  //   if (counter > stock || counter <= 0) {
  //     return setMessage("Số lượng sản phẩm không hợp lệ!");
  //   }
  //   setSelected([choose]);
  //   console.log(choose);
  //   navigate("/checkout");
  // };

  const onCart = () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
    if (choose === undefined && availableAttributes.length > 0) {
      return setMessage("Vui lòng chọn phân loại sản phẩm!");
    }
    if (counter > stock || counter <= 0) {
      return setMessage("Số lượng sản phẩm không hợp lệ!");
    }
    const postData = async (data) => {
      const response = await addToCart(data);
      if (response.error) {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          theme: "light",
        });
      } else {
        toast.success("Thêm vào giỏ hàng thành công!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          transition: Bounce,
        });
      }
      await getCart();
    };
    postData({
      product_variant_id: choose?.id || data?.product_variants[0]?.id,
      quantity: counter,
    });
  };

  const findVariant = (variantSeclect = {}) => {
    const { product_variants = [] } = data;
    // Danh sach cac bien the da chon
    const value = Object.values(variantSeclect);
    // Duyet tung bien the san pham API tra ve
    for (const variant of product_variants) {
      // Dieu kien de ko bi loi
      if (variant?.variant?.length > 0) {
        // Duyet tung gia tri trong moi bien the san pham
        let check = true;
        for (const element of variant.variant) {
          // Neu danh sach da chon khong chua gia tri cua bien the san pham
          if (!value.includes(element.value)) {
            check = false;
          }
        }
        if (check) {
          setStock(variant?.stock);
          return setChoose(variant);
        }
      }
    }
    setStock(data?.stock);
    return setChoose();
  };
  const onMinus = () => {
    setCounter((prev) => prev - 1);
  };
  const onPlus = () => {
    setCounter((prev) => prev + 1);
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await getProductById(id);
      if (!response?.data || !response.data?.id) {
        navigate("/");
        return;
      }
      setStock(response?.data?.stock);
      setData(response?.data);
      setAvailableAttributes(response?.data?.available_attributes);
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
    };
    getData();
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, [id, navigate, setLoading]);

  useEffect(() => {
    const getRecommend = async () => {
      const response = await getRecommnedProduct(id);
      if (response?.data) {
        setRecommend(response?.data);
      }
    };
    getRecommend();
  }, [id]);
  useEffect(() => {
    findVariant(variantSeclect);
    if (choose) {
      setMessage("");
    }
    if (counter <= stock && counter > 0) {
      setMessage("");
    }
    // eslint-disable-next-line
  }, [variantSeclect, choose, counter]);
  return (
    <div className="w-full max-w-[1110px] mx-auto py-10">
      <ToastContainer />
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
                <div key={index} className="w-[600px] h-[600px]">
                  <img
                    ref={imageRef}
                    src={
                      process.env.REACT_APP_SERVER_URL +
                      (choose ? choose.image : value.path)
                    }
                    alt=""
                    className="w-full h-full object-cover"
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
                <div className="w-[100px] h-[100px]">
                  <img
                    src={process.env.REACT_APP_SERVER_URL + value.path}
                    alt=""
                    className="w-full h-full object-cover px-2"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="flex-1">
          <div className="text-[22px] font-semibold mb-[10px]">
            {data?.name}
          </div>

          <div className="flex gap-5 text-red text-[28px] font-semibold bg-light-blue p-3 my-3">
            {choose?.old_price && (
              <div className="flex">
                <div className="text-lg leading-10">₫</div>
                <div className="">
                  {new Intl.NumberFormat().format(choose?.price * 1000)}
                </div>
              </div>
            )}
            {choose?.old_price ? (
              <div className="flex text-slate-400 items-center">
                <div className="text-lg leading-10">₫</div>
                <div className="line-through font-normal">
                  {new Intl.NumberFormat().format(choose?.old_price * 1000)}
                </div>
                <div className="bg-secondary text-sm font-light text-white px-1 ml-5">
                  Sale
                </div>
              </div>
            ) : (
              <div className="flex">
                <div className="text-lg leading-10 ">₫</div>
                <div>{new Intl.NumberFormat()?.format(data?.price * 1000)}</div>
              </div>
            )}
          </div>
          {Object?.entries(availableAttributes)?.map(([key, values]) => (
            <div key={key} className="flex mb-5">
              <div className="flex-[1]">{key}</div>
              <div className="flex flex-[4] gap-2 flex-wrap">
                {values.map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      console.log(key);
                      if (variantSeclect[key] === value) {
                        setVariantSelect((prev) => {
                          const obj = { ...prev };
                          delete obj[key];
                          return { ...obj };
                        });
                      } else {
                        setVariantSelect((prev) => {
                          return {
                            ...prev,
                            [key]: value,
                          };
                        });
                      }
                      findVariant(variantSeclect);
                    }}
                    className={`border rounded-sm px-2 text-text ${
                      variantSeclect[key] === value
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
          {/* {Array.from(variant_of_product.variant).map((name, index1) => (
            <div key={index1} className="flex mb-5">
              <div className="flex-[1]">{name}</div>
              <div className="flex flex-[4] gap-2 flex-wrap">
                {Array.from(variant_of_product[name]).map((value, index2) => (
                  <button
                    key={index2}
                    onClick={() => {
                      console.log(value);
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
          ))} */}
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
              onMinusClick={onMinusClick}
              onPlusClick={onPlusClick}
            />
          </div>
          <div className="flex items-center text-text mb-[20px]">
            <div className="flex-[1]">Có sẵn</div>
            <div className="flex flex-[4]">
              <div className="text-red mr-1">{stock}</div> Sản phẩm
            </div>
          </div>
          <div className="text-red text-xs mb-5">{message}</div>
          {/* <Button
            label={"Mua ngay"}
            className={"w-full mb-5"}
            onClick={onBuy}
          /> */}
          <Button
            label={"Thêm vào giỏ hàng"}
            className={"w-full"}
            variant="green"
            onClick={onCart}
          />
        </div>
      </div>
      <Accordion title={"Mô tả sản phẩm"}>
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="pt-4"
        />
      </Accordion>
      <Section title="Sản phẩm liên quan" button={false}>
        {recommend?.map((value, index) => {
          return (
            <Card
              key={index}
              className={"w-[200px] h-[300px]"}
              data={value}
              image={value?.product_images[0]?.path}
              onClick={() => {
                navigate(`/product/${value.id}`);
              }}
            />
          );
        })}
      </Section>
    </div>
  );
};

export default ProductDetail;
