import { useContext, useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlinePayment } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { Radio, Modal } from "antd";
import { useNavigate } from "react-router-dom";

import getAddress from "../services/addressService/getAddress";
import { getAllCart } from "../services/cart";
import { insertOrder } from "../services/order";
import Button from "../components/button/Button";
import { CartToCheckoutContext } from "../contexts/CartToCheckoutContext";
import { toast, ToastContainer } from "react-toastify";

const Checkout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pay, setPay] = useState("COD");
  const [address, setAddress] = useState([]);
  const [tempId, setTmpId] = useState();
  const [addressChoose, setAddressChoose] = useState({});
  const [cart, setCart] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setAddressChoose(tempId);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const { selected, setSelected } = useContext(CartToCheckoutContext);
  console.log(selected);
  let totalMoney = 0;
  selected?.forEach((value) => {
    totalMoney += (value?.price || value?.old_price) * value.quantity;
  });
  const onSubmit = async () => {
    if (!addressChoose) {
      return alert("Vui lòng chọn địa chỉ!");
    }
    const card_item_ids = [];
    selected.forEach((value) => {
      card_item_ids.push(value?.id);
    });
    const response = await insertOrder({
      card_item_ids: card_item_ids,
      method: pay,
      address_id: addressChoose.id,
    });
    if (response.checkoutUrl) {
      window.location.href = response.checkoutUrl;
    } else {
      toast.success("Đặt hàng thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/");
      }, [1000]);
    }
  };
  useEffect(() => {
    const getData = async () => {
      const response = await getAddress();
      if (response?.error) {
        toast.error(response?.mesage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          theme: "light",
        });
      } else {
        setAddress(response.data);
        setAddressChoose(response.data[0]);
      }
    };
    getData();
  }, []);
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await getAllCart();
  //     if (response.error) {
  //       alert(response.error);
  //     } else {
  //       setCart(response.data);
  //     }
  //   };
  //   getData();
  // }, []);
  return (
    <div className="w-full max-w-[1110px] mx-auto pb-[100px]">
      <ToastContainer />
      <div className="w-fit text-2xl font-medium pt-5 mb-5 py-3 text-primary border-b-primary border-b-[2px]">
        Thanh toán
      </div>
      <div className="bg-white p-5">
        <div className="flex items-center gap-3 text-secondary mb-2">
          <HiOutlineLocationMarker className="text-lg" />
          <div className="text-lg font-medium">Địa chỉ nhận hàng</div>
        </div>
        <div className="flex justify-between">
          <div className="font-medium">
            <div>{addressChoose?.name}</div>
            <div>{addressChoose?.phone}</div>
          </div>
          <div>{addressChoose?.address}</div>
          {addressChoose?.is_default === "1" ? (
            <div className="text-xs text-red">Mặc định</div>
          ) : (
            <></>
          )}
          <div
            className="cursor-pointer text-blue-500"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Chỉnh sửa
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <div className="text-xl font-medium uppercase mb-5">Sổ địa chỉ</div>
          {address.map((value, index) => (
            <div
              className="border-t-[1px] border-gray border-opacity-50 py-5 flex gap-5 text-base"
              key={index}
            >
              <input
                onChange={() => setTmpId(value)}
                name="address"
                type="radio"
                defaultChecked={value.id === addressChoose.id}
              />
              <div className="w-full flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="font-medium">{value.name}</div>
                    <div className="w-[1px] bg-gray bg-opacity-50 h-[16px]"></div>
                    <div>{value.phone}</div>
                  </div>
                  <div className="text-xs text-red mr-5">
                    {value.is_default === "1" ? "Mặc định" : ""}
                  </div>
                </div>
                <div>{value.address}</div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <div className="bg-white mt-10 p-5">
        <div className="flex gap-3 items-center text-lg font-medium text-secondary">
          <AiFillProduct />
          <div>Danh sách sản phẩm</div>
        </div>
        <div className="flex justify-between py-3 my-3">
          <div className="flex-[3]">Sản phẩm</div>
          <div className="flex-[1]">Đơn giá</div>
          <div className="flex-[1]">Số lượng</div>
          <div className="flex-[1]">Thành tiền</div>
        </div>
        {selected?.map((value, index) => (
          <div className="flex justify-between items-center py-3 my-3 border-t-[1px] border-gray-light">
            <div className="flex-[3] flex gap-3 items-center">
              <img
                src={process.env.REACT_APP_SERVER_URL + value.image}
                alt=""
                className="w-[60px] h-[60px] object-cover rounded-md"
              />
              <div>
                <div>{value?.name}</div>
                <div className="flex gap-1">
                  {value?.variant?.map((value, index) => (
                    <div>{value?.value}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-[1]">{value?.price || value?.old_price}</div>
            <div className="flex-[1]">{value?.quantity}</div>
            <div className="flex-[1]">{value?.price * value?.quantity}</div>
          </div>
        ))}
      </div>
      <div className="bg-white mt-10 p-5">
        <div className="flex gap-3 items-center text-lg font-medium text-secondary">
          <MdOutlinePayment />
          <div>Phương thức thanh toán</div>
        </div>
        <Radio.Group
          defaultValue="COD"
          buttonStyle="outline"
          className="mt-5"
          onChange={(e) => setPay(e.target.value)}
        >
          <Radio.Button value="COD">Thanh toán khi nhận hàng</Radio.Button>
          <Radio.Button value="bank" disabled={true}>
            Chuyển khoản qua ngân hàng
          </Radio.Button>
          <Radio.Button value="credit" disabled={true}>
            Thẻ tín dụng/Ghi nợ
          </Radio.Button>
          <Radio.Button value="QR">VietQR</Radio.Button>
        </Radio.Group>
        {pay === "COD" && (
          <div className="text-text mt-5">
            Thanh toán khi nhận hàng: Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận
            chuyển (nếu có) áp dụng cả với phí thu hộ.
          </div>
        )}
        {pay === "QR" && (
          <div className="text-text mt-5">
            Thanh toán qua mã QR: Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển
            (nếu có) áp dụng cả với phí thu hộ.
          </div>
        )}
        <div className="w-full bg-gray-light h-[1px] my-5"></div>
        <div className="flex flex-col items-end">
          <div className="flex gap-5 items-center my-5">
            <div>Tổng thanh toán:</div>
            <div className="text-2xl font-semibold text-red">
              {new Intl.NumberFormat().format(totalMoney * 1000)}
              {"đ"}
            </div>
          </div>
          <Button label="Đặt hàng" className="px-5" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
