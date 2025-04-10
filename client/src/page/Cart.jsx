import { useContext } from "react";
import { Link } from "react-router-dom";

import { HeaderContext } from "../contexts/HeaderContext";
import Counter from "../components/counter/Counter";
import Button from "../components/button/Button";
import { deleteCartItem } from "../services/cart";

const Cart = () => {
  const { cart, getCart } = useContext(HeaderContext);
  let totalMoney = 0;
  const handleDelete = async (id) => {
    const response = await deleteCartItem(id);
    alert(response.message);
    getCart();
  };
  cart?.forEach((value) => {
    totalMoney += (value?.price || value?.old_price) * value.quantity;
  });
  return (
    <div className="w-full max-w-[1110px] mx-auto pb-[100px]">
      <table className="w-full border-y-[1px] mt-8">
        <thead>
          <td className="py-5">Thông tin sản phẩm</td>
          <td>Đơn giá</td>
          <td>Số lượng</td>
          <td>Thành tiền</td>
          <td>Thao tác</td>
        </thead>
        <tbody>
          {cart.map((value, index) => (
            <tr key={index} className=" border-y-[1px] border-gray-light">
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
                      {value?.variant?.map((value) => (
                        <div>
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
