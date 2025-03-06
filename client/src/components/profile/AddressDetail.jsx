import { useContext } from "react";

import { AddressContext } from "../../contexts/AddressContext";
import deleteAddress from "../../services/addressService/deleteAddress";

const AddressDetail = ({
  id,
  name,
  address,
  phone,
  isDefault,
  handleClose,
}) => {
  const { setData } = useContext(AddressContext);
  const handleClick = () => {
    setData({
      id: id,
      name: name,
      address: address,
      phone: phone,
      isDefault: isDefault,
    });
    handleClose();
  };
  const handleDelete = async () => {
    const response = await deleteAddress(id);
    alert(response.message);
    setData({ id: 0, name: "", address: "", phone: "", isDefault: false });
  };
  return (
    <div>
      <div className="h-[1px] w-full bg-dark mt-10"></div>
      <div className="flex justify-between items-center text-sm">
        <div>
          <div className="flex items-center font-bold mt-5">
            Họ tên:
            <div className="font-normal ml-2">{name}</div>
            {isDefault ? (
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
          <div className="text-red-500 cursor-pointer" onClick={handleDelete}>
            Xóa
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressDetail;
