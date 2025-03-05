import { useForm } from "react-hook-form";

import Input from "../input/Input";
import Button from "../button/Button";
import changePassword from "../../services/authService/changePassword";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ className }) => {
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
      alert(response.message);
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="uppercase text-[19px]">Đổi Mật Khẩu</div>
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
          className={"uppercase w-[200px] text-sm font-bold mt-4 rounded-md"}
        />
      </form>
    </div>
  );
};

export default ChangePassword;
