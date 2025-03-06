import { useContext } from "react";

import { AddressContext } from "../../contexts/AddressContext";

const AddressDetail = ({ name, address, phone, defaul, handleClick }) => {
  const { setClose } = useContext(AddressContext);
  return (
    <div>
      <div className="h-[1px] w-full bg-dark mt-10"></div>
      <div className="flex justify-between items-center text-sm">
        <div>
          <div className="flex items-center font-bold mt-5">
            Họ tên:
            <div className="font-normal ml-2">{name}</div>
            {defaul ? (
              <div className="font-normal text-[10px] text-primary ml-4">
                Địa chỉ mặc định
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex font-bold mt-3">
            Địa chỉ:
            <div className="font-normal ml-2">{address}</div>
          </div>
          <div className="flex font-bold mt-3">
            Số điện thoại: <div className="font-normal ml-2">{phone}</div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="text-blue-500 cursor-pointer" onClick={handleClick}>
            Chỉnh sửa địa chỉ
          </div>
          <div className="text-red-500">Xóa</div>
        </div>
      </div>
    </div>
  );
};

export default AddressDetail;
