import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";

import Input from "../input/Input";
import Button from "../button/Button";
import changePassword from "../../services/authService/changePassword";
import { HeaderContext } from "../../contexts/HeaderContext";

const ChangePassword = ({ className }) => {
  const { setUser } = useContext(HeaderContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const newPassword = watch("newPassword");
  const onSubmit = async (data) => {
    const response = await changePassword(data);
    if (response.message === "Đổi mật khẩu thành công") {
      toast.success("Đổi mật khẩu thành công", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        theme: "light",
      });
      setUser("");
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="uppercase text-xl">Đổi Mật Khẩu</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="my-3">Mật khẩu cũ *</div>
          <Input
            className={"w-[400px]"}
            register={register("oldPassword", {
              required: "Vui lòng nhập mật khẩu cũ",
            })}
            type="password"
            errorMessage={errors?.oldPassword?.message}
          />
        </div>
        <div>
          <div className="my-3">Mật khẩu mới *</div>
          <Input
            className={"w-[400px]"}
            register={register("newPassword", {
              required: "Vui lòng nhập mật khẩu mới",
            })}
            type="password"
            errorMessage={errors?.newPassword?.message}
          />
        </div>
        <div>
          <div className="my-3">Xác nhận lại mật khẩu *</div>
          <Input
            className={"w-[400px]"}
            register={register("reNewPassword", {
              required: "Vui lòng nhập lại mật khẩu",
              validate: (value) => {
                if (value !== newPassword)
                  return "Xác nhật mật khẩu không trùng khớp";
                return true;
              },
            })}
            type="password"
            errorMessage={errors?.reNewPassword?.message}
          />
        </div>
        <Button
          label={"Đặt lại mật khẩu"}
          className={"w-[200px] uppercase text-sm font-bold mt-4 rounded-md"}
        />
      </form>
    </div>
  );
};

export default ChangePassword;
