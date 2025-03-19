import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

const ProfileNav = ({ className }) => {
  const { user } = useContext(UserContext);
  return (
    <div className={`flex flex-col gap-4 text-sm ${className}`}>
      <div className="uppercase text-xl">Trang tài khoản</div>
      <div className="flex gap-1 font-bold">
        Xin chào,{" "}
        <div className="text-red-500">
          {user?.lastName ? `${user.lastName} !` : ""}
        </div>
      </div>
      <Link to="/profile" className={`hover:text-secondary`}>
        Thông tin tài khoản
      </Link>
      <Link to="/profile/order" className={`hover:text-secondary `}>
        Đơn hàng của bạn
      </Link>
      <Link to="/profile/changepassword" className={`hover:text-secondary `}>
        Đổi mật khẩu
      </Link>
      <Link to="/profile/address" className={`hover:text-secondary `}>
        Sổ địa chỉ
      </Link>
    </div>
  );
};

export default ProfileNav;
