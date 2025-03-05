import { IoCloseOutline } from "react-icons/io5";

import Button from "../button/Button";

const AddressDetail = ({ name, address, phone, defaul }) => {
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
          <div className="text-blue-500">Chỉnh sửa địa chỉ</div>
          <div className="text-red-500">Xóa</div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-5 rounded-md relative">
          <form action="" className="w-[600px]">
            <div className="uppercase font-bold">Chỉnh sửa địa chỉ</div>
            <IoCloseOutline className="absolute top-3 right-3" fontSize={32} />
            <div className="h-[1px] w-full bg-dark my-8"></div>
            <div className="relative">
              <input
                type="text"
                id="name"
                className="w-full border py-2 px-3 outline-none mb-8 border-gray peer"
                placeholder=""
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
              />
              <label
                htmlFor="phone"
                className="text-sm text-gray bg-white px-2 absolute top-[-10px] left-3 transition-all peer-placeholder-shown:top-[10px] peer-placeholder-shown:bg-transparent"
              >
                Số điện thoại
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" />
              <div>Đặt làm địa chỉ mặc định</div>
            </div>
            <div className="flex justify-end">
              <Button
                label={"Hủy"}
                variant="white"
                className={"w-[60px] h-10 mr-5 rounded-none"}
              />
              <Button
                label={"Cập nhập địa chỉ"}
                className={"w-[200px] h-10 rounded-none"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressDetail;
