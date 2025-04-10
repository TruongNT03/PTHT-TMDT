import { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlinePayment } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";

import getAddress from "../services/addressService/getAddress";
import { getAllCart } from "../services/cart";
import Button from "../components/button/Button";

const Checkout = () => {
  const [address, setAddress] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await getAddress();
      if (response.error) {
        alert(response.error);
      } else {
        setAddress(response.data);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const response = await getAllCart();
      if (response.error) {
        alert(response.error);
      } else {
        setCart(response.data);
      }
    };
    getData();
  }, []);
  return (
    <div className="w-full max-w-[1110px] mx-auto pb-[100px]">
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
            <div>{address[0]?.name}</div>
            <div>{address[0]?.phone}</div>
          </div>
          <div>{address[0]?.address}</div>
          {address[0]?.is_default ? (
            <div className="text-xs text-red">Mặc định</div>
          ) : (
            <></>
          )}
          <div className="cursor-pointer text-blue-500">Chỉnh sửa</div>
        </div>
      </div>
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
        {cart?.map((value, index) => (
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
                    <div>
                      {value?.value}
                      {","}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-[1]">{value?.price || value?.old_price}</div>
            <div className="flex-[1]">{value?.quantity}</div>
            <div className="flex-[1]">
              {(value?.price || value?.old_price) * value?.quantity}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white mt-10 p-5">
        <div className="flex gap-3 items-center text-lg font-medium text-secondary">
          <MdOutlinePayment />
          <div>Phương thức thanh toán</div>
        </div>
        <div className="my-5">
          <input type="radio" id="COD" className="ml-1" />
          <label htmlFor="COD" className="ml-3">
            Thanh toán khi nhận hàng
          </label>
        </div>
        <div className="text-text ml-5">
          Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển
          (nếu có) áp dụng cả với phí thu hộ.
        </div>
        <div className="w-full bg-gray-light h-[1px] my-5"></div>
        <div className="flex flex-col items-end">
          <div className="flex gap-5 items-center my-5">
            <div>Tổng thanh toán:</div>
            <div className="text-2xl font-semibold text-red">120, 000đ</div>
          </div>
          <Button label="Đặt hàng" className="px-5" />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
