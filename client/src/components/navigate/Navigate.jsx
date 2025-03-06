import { IoIosArrowForward } from "react-icons/io";

const Navigate = ({ className }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div>Trang chủ</div>
      <IoIosArrowForward fontSize={12} />
      <div className="font-bold text-primary">Trang khách hàng</div>
    </div>
  );
};

export default Navigate;
