import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "antd";
import { BsCart2 } from "react-icons/bs";

import { HeaderContext } from "../contexts/HeaderContext";
import Counter from "../components/counter/Counter";
import Button from "../components/button/Button";
import { deleteCartItem } from "../services/cart";
import { CartToCheckoutContext } from "../contexts/CartToCheckoutContext";

const Cart = () => {
  const { cart, getCart } = useContext(HeaderContext);
  const { selected, setSelected } = useContext(CartToCheckoutContext);
  let totalMoney = 0;
  const handleDelete = async (id) => {
    const response = await deleteCartItem(id);
    alert(response.message);
    getCart();
  };
  selected?.forEach((value) => {
    totalMoney += (value?.price || value?.old_price) * value.quantity;
  });
  useEffect(() => {
    setSelected([]);
  }, [setSelected]);
  return (
    <div className="w-full max-w-[1110px] bg-light-blue pt-8 mx-auto pb-[50px]">
      <div className="text-2xl text-primary font-medium flex gap-4">
        <BsCart2 />
        <div>Giỏ hàng</div>
      </div>
      <table className="w-full border-y-[1px] mt-8">
        <thead>
          <tr>
            <td className="w-[50px]"></td>
            <td className="py-5">Thông tin sản phẩm</td>
            <td>Đơn giá</td>
            <td>Số lượng</td>
            <td>Thành tiền</td>
            <td>Thao tác</td>
          </tr>
        </thead>
        <tbody>
          {cart.map((value, index) => (
            <tr key={index} className=" border-y-[1px] border-gray-light">
              <td>
                <Checkbox
                  onClick={(e) => {
                    if (e.target.checked) {
                      setSelected((prev) => [...prev, value]);
                    } else {
                      setSelected((prev) => {
                        const newSelected = prev.filter(
                          (element) => element !== value
                        );
                        return newSelected;
                      });
                    }
                  }}
                />
              </td>
              <td>
                <div className="flex items-center gap-3 py-5">
                  <img
                    src={process.env.REACT_APP_SERVER_URL + value.image}
                    alt=""
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <div>{value.name} </div>
                    <div className="flex">
                      {value?.variant?.map((value, index) => (
                        <div key={index}>
                          {value?.value} {", "}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {new Intl.NumberFormat().format(
                  (value.price || value.old_price) * 1000
                )}
                {"đ"}
              </td>
              <td>
                <Counter state={value.quantity} />
              </td>
              <td>
                {new Intl.NumberFormat().format(
                  (value.price || value.old_price) * value.quantity * 1000
                )}
                {"đ"}
              </td>
              <td
                className="text-blue-500 hover:text-red cursor-pointer"
                onClick={() => {
                  handleDelete(value.id);
                  setSelected((prev) => {
                    const newSelected = prev.filter(
                      (element) => element !== value
                    );
                    return newSelected;
                  });
                }}
              >
                Xóa
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex flex-col items-end">
        <div className="mt-5">
          Tổng tiền: {new Intl.NumberFormat().format(totalMoney * 1000)}đ
        </div>
        <Link to="/checkout">
          <Button label="Thanh toán" className="px-3 my-5" />
        </Link>
      </div>
    </div>
  );
};

export default Cart;
