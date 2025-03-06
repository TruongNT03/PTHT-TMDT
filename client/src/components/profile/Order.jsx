const Order = ({ className }) => {
  return (
    <div className={` ${className}`}>
      <div className="uppercase text-xl">Đơn hàng của bạn</div>
      <table className="w-full table-auto mt-8 font-semibold text-sm text-white border border-gray-light">
        <thead>
          <tr className="">
            <th className="bg-secondary border-x py-1">Đơn hàng</th>
            <th className="bg-secondary border-x">Ngày</th>
            <th className="bg-secondary border-x">Địa chỉ</th>
            <th className="bg-secondary border-x">Giá trị đơn hàng</th>
            <th className="bg-secondary border-x">TT Thanh toán</th>
            <th className="bg-secondary border-x">TT Vận Chuyển</th>
          </tr>
        </thead>
        <tbody className="text-dark">
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Order;
