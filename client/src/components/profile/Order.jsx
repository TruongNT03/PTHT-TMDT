import { useEffect, useState } from "react";
import { getAllOrder } from "../../services/order";
import formatDate from "../../utils/formatDate";
import { toast, ToastContainer, Bounce } from "react-toastify";

const Order = ({ className }) => {
  const [orders, setOrders] = useState([]);
  const statusTranslate = (value) => {
    switch (value) {
      case "ordered":
        return "Đã đặt hàng";
      case "prepare":
        return "Đang chuẩn bị";
      case "shipping":
        return "Đang giao hàng";
      case "completed":
        return "Đã giao hàng";
      default:
        return "Không xác định";
    }
  };
  useEffect(() => {
    const getData = async () => {
      const response = await getAllOrder();
      if (response.error) {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          theme: "light",
        });
      } else {
        setOrders(response.data);
      }
    };
    getData();
  }, []);
  return (
    <div className={` ${className}`}>
      <ToastContainer />
      <div className="uppercase text-xl">Đơn hàng của bạn</div>
      <table className="w-full table-auto mt-8 text-sm text-white border border-gray-light">
        <thead>
          <tr className="">
            <th className="bg-secondary border-x py-1">ID</th>
            {/* <th className="bg-secondary border-x">Ngày</th> */}
            {/* <th className="bg-secondary border-x">Địa chỉ</th> */}
            <th className="bg-secondary border-x">Giá trị đơn hàng</th>
            <th className="bg-secondary border-x">Trạng thái thanh toán</th>
            <th className="bg-secondary border-x">Trạng thái</th>
            <th className="bg-secondary border-x">Tên người nhận</th>
            <th className="bg-secondary border-x">Địa chỉ</th>
            <th className="bg-secondary border-x">Số điện thoại</th>
            <th className="bg-secondary border-x">Ngày đặt hàng</th>
            {/* <th className="bg-secondary border-x">TT Thanh toán</th> */}
            {/* <th className="bg-secondary border-x">TT Vận Chuyển</th> */}
          </tr>
        </thead>
        <tbody className="text-dark font-light ">
          {orders.map((value, index) => (
            <tr key={index} className="border-b-[1px] border-gray font-light">
              <th className="py-2 font-medium">{"#" + value.id}</th>
              <th className="font-medium">
                {new Intl.NumberFormat().format(value.total_price * 1000)} đ
              </th>
              <th className="font-medium">
                {value.payment ? "Đã thanh toán" : "Chưa thanh toán"}
              </th>
              <th className="font-medium">{statusTranslate(value.status)}</th>
              <th className="py-2 font-medium">{value.address.name}</th>
              <th className="py-2 font-medium">{value.address.address}</th>
              <th className="py-2 font-medium">{value.address.phone}</th>
              <th className="font-medium">{formatDate(value.createdAt)}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
