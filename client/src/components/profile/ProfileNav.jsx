import { Link } from "react-router-dom";
const ProfileNav = ({ className }) => {
  return (
    <div className={`flex flex-col gap-4 text-sm ${className}`}>
      <div className="uppercase text-[19px]">Trang tài khoản</div>
      <div className="flex gap-1 font-bold">
        Xin chào, <div className="text-red-500">Trường !</div>
      </div>
      <Link to="/profile">Thông tin tài khoản</Link>
      <Link to="/profile/order">Đơn hàng của bạn</Link>
      <Link to="/profile/changepassword">Đổi mật khẩu</Link>
      <Link to="/profile/address">Số địa chỉ</Link>
    </div>
  );
};

export default ProfileNav;
