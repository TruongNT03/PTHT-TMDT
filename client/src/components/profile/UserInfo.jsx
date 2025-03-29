import React, { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

const UserInfo = ({ className }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="flex justify-between">
      <div className={`flex flex-col gap-4 text-sm ${className}`}>
        <div className="uppercase text-xl">Thông tin tài khoản</div>
        <div className="flex gap-1 font-bold">
          Họ: <div className="font-normal">{user?.firstname}</div>
        </div>
        <div className="flex gap-1 font-bold">
          Tên: <div className="font-normal">{user?.lastname}</div>
        </div>
        <div className="flex gap-1 font-bold">
          Email: <div className="font-normal">{user?.email}</div>
        </div>
        <div className="flex gap-1 font-bold">Chỉnh sửa thông tin</div>
      </div>
      <div className="flex flex-col gap-4 item">
        <img
          src={user?.avatar}
          alt=""
          className="h-[200px] w-[200px] rounded-full"
        />
        {/* <input type="file" /> */}
      </div>
    </div>
  );
};

export default UserInfo;
