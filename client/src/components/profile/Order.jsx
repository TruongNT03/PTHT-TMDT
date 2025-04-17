import { useEffect, useState } from "react";
import { getAllOrder } from "../../services/order";

const Order = ({ className }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await getAllOrder();
      if (response.error) {
        alert(response.message);
      } else {
        setOrders(response.data);
      }
    };
    getData();
  }, []);
  return (
    <div className={` ${className}`}>
      <div className="uppercase text-xl">Đơn hàng của bạn</div>
      <table className="w-full table-auto mt-8 font-semibold text-sm text-white border border-gray-light">
        <thead>
          <tr className="">
            <th className="bg-secondary border-x py-1">ID</th>
            {/* <th className="bg-secondary border-x">Ngày</th> */}
            {/* <th className="bg-secondary border-x">Địa chỉ</th> */}
            <th className="bg-secondary border-x">Giá trị đơn hàng</th>
            <th className="bg-secondary border-x">Trạng thái</th>
            {/* <th className="bg-secondary border-x">TT Thanh toán</th> */}
            {/* <th className="bg-secondary border-x">TT Vận Chuyển</th> */}
          </tr>
        </thead>
        <tbody className="text-dark">
          {orders.map((value, index) => (
            <tr key={index}>
              <th>{value.id}</th>
              <th>{value.total_price}</th>
              <th>{value.status}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
