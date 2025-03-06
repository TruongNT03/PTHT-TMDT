import { IoCloseOutline } from "react-icons/io5";
import { useContext } from "react";
import { useForm } from "react-hook-form";

import Button from "../button/Button";
import { AddressContext } from "../../contexts/AddressContext";
import newAddress from "../../services/addressService/newAddress";
import changeAddress from "../../services/addressService/changeAddress";

const AddressDialog = ({
  id = 0,
  name = "",
  address = "",
  phone = "",
  isDefault = false,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name,
      address,
      phone,
      isDefault,
    },
  });

  const { setClose } = useContext(AddressContext);

  const handleClose = () => {
    setClose((prev) => !prev);
  };

  const onSubmit = async (data) => {
    if (id !== 0) {
      await changeAddress({ ...data, id: id });
    } else {
      await newAddress(data);
    }
    setClose(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-md relative">
        <form action="" className="w-[600px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="uppercase font-bold">Chỉnh sửa địa chỉ</div>
          <IoCloseOutline
            className="absolute top-3 right-3 cursor-pointer"
            fontSize={32}
            onClick={handleClose}
          />
          <div className="h-[1px] w-full bg-dark my-8"></div>
          <div className="relative">
            <div className="absolute text-sm text-red-500 left-0 -top-7">
              {errors?.name?.message}
            </div>
            <input
              type="text"
              id="name"
              className="w-full border py-2 px-3 outline-none mb-8 border-gray peer"
              placeholder=""
              {...register("name", {
                required: "Tên không được để trống",
                pattern: {
                  value: /^[A-Za-zÀ-Ỹà-ỹĂăÂâĐđÊêÔôƠơƯư\s]+$/,
                  message: "Tên chỉ gồm các chữ cái",
                },
              })}
            />
            <label
              htmlFor="name"
              className="text-sm text-gray bg-white px-2 absolute top-[-10px] left-3 transition-all peer-placeholder-shown:top-[10px] peer-placeholder-shown:bg-transparent"
            >
              Họ tên
            </label>
          </div>
          <div className="relative">
            <div className="absolute text-sm text-red-500 left-0 -top-7">
              {errors?.address?.message}
            </div>
            <input
              type="text"
              id="address"
              className="w-full border py-2 px-3 outline-none mb-8 border-gray peer"
              placeholder=""
              {...register("address", {
                required: "Địa chỉ không được để trống",
              })}
            />
            <label
              htmlFor="address"
              className="text-sm text-gray bg-white px-2 absolute top-[-10px] left-3 transition-all peer-placeholder-shown:top-[10px] peer-placeholder-shown:bg-transparent"
            >
              Địa chỉ
            </label>
          </div>
          <div className="relative">
            <div className="absolute text-sm text-red-500 left-0 -top-7">
              {errors?.phone?.message}
            </div>
            <input
              type="text"
              id="phone"
              className="w-full border py-2 px-3 outline-none mb-8 border-gray peer"
              placeholder=""
              {...register("phone", {
                required: "Số điện thoại không được để trống",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Số điện thoại chỉ chứa các chữ số",
                },
              })}
            />
            <label
              htmlFor="phone"
              className="text-sm text-gray bg-white px-2 absolute top-[-10px] left-3 transition-all peer-placeholder-shown:top-[10px] peer-placeholder-shown:bg-transparent"
            >
              Số điện thoại
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" {...register("isDefault", {})} />
            <div>Đặt làm địa chỉ mặc định</div>
          </div>
          <div className="flex justify-end">
            <Button
              label={"Hủy"}
              variant="white"
              className={"w-[60px] h-10 mr-5 rounded-none"}
              onClick={handleClose}
              type="button"
            />
            <Button
              label={"Cập nhập địa chỉ"}
              className={"w-[200px] h-10 rounded-none"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressDialog;
