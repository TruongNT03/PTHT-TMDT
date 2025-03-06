import React from "react";

const UserInfo = ({ className }) => {
  return (
    <div className={`flex flex-col gap-4 text-sm ${className}`}>
      <div className="uppercase text-xl">Thông tin tài khoản</div>
      <div className="flex gap-1 font-bold">
        Họ: <div className="font-normal">Nguyễn Trọng</div>
      </div>
      <div className="flex gap-1 font-bold">
        Tên: <div className="font-normal">Trường</div>
      </div>
      <div className="flex gap-1 font-bold">
        Email: <div className="font-normal">ntt26072003@gmail.com</div>
      </div>
      <div className="flex gap-1 font-bold">
        Địa chỉ: <div className="font-normal">Ngọc Lâm, Mỹ Hào, Hưng Yên</div>
      </div>
    </div>
  );
};

export default UserInfo;
