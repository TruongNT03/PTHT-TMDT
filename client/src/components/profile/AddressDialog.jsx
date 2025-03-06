import { IoCloseOutline } from "react-icons/io5";

import Button from "../button/Button";
import { useContext } from "react";
import { AddressContext } from "../../contexts/AddressContext";

const AddressDialog = ({
  name = "",
  address = "",
  phone = "",
  defaul = false,
}) => {
  const { setClose } = useContext(AddressContext);
  const handleClose = () => {
    setClose((prev) => !prev);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-md relative">
        <form action="" className="w-[600px]">
          <div className="uppercase font-bold">Chỉnh sửa địa chỉ</div>
          <IoCloseOutline
            className="absolute top-3 right-3 cursor-pointer"
            fontSize={32}
            onClick={handleClose}
          />
          <div className="h-[1px] w-full bg-dark my-8"></div>
          <div className="relative">
            <input
              type="text"
              id="name"
              className="w-full border py-2 px-3 outline-none mb-8 border-gray peer"
              placeholder=""
              value={name}
            />
            <label
              htmlFor="name"
              className="text-sm text-gray bg-white px-2 absolute top-[-10px] left-3 transition-all peer-placeholder-shown:top-[10px] peer-placeholder-shown:bg-transparent"
            >
              Họ tên
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="address"
              className="w-full border py-2 px-3 outline-none mb-8 border-gray peer"
              placeholder=""
              value={address}
            />
            <label
              htmlFor="address"
              className="text-sm text-gray bg-white px-2 absolute top-[-10px] left-3 transition-all peer-placeholder-shown:top-[10px] peer-placeholder-shown:bg-transparent"
            >
              Địa chỉ
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="phone"
              className="w-full border py-2 px-3 outline-none mb-8 border-gray peer"
              placeholder=""
              value={phone}
            />
            <label
              htmlFor="phone"
              className="text-sm text-gray bg-white px-2 absolute top-[-10px] left-3 transition-all peer-placeholder-shown:top-[10px] peer-placeholder-shown:bg-transparent"
            >
              Số điện thoại
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" defaultChecked={defaul} />
            <div>Đặt làm địa chỉ mặc định</div>
          </div>
          <div className="flex justify-end">
            <Button
              label={"Hủy"}
              variant="white"
              className={"w-[60px] h-10 mr-5 rounded-none"}
              onClick={handleClose}
            />
            <Button
              label={"Cập nhập địa chỉ"}
              className={"w-[200px] h-10 rounded-none"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressDialog;
