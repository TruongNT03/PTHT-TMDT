import { FaFacebookSquare } from "react-icons/fa";
import { ImGoogle2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { useController, useForm } from "react-hook-form";

import Button from "../../components/button/Button";
import Input from "../../components/inpput/Input";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dữ liệu đăng nhập:", data);
  };

  return (
    <div className="w-full mt-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[368px] items-center gap-[15px] p-6 rounded-xl mx-auto shadow-2xl"
      >
        <div className="text-[26px] uppercase">Đăng nhập</div>
        <div className="text-[14px]">
          Nếu bạn chưa có tài khoản,{" "}
          <Link className="text-primary">đăng ký tại đây</Link>
        </div>
        <Input
          className="w-full"
          label="Email"
          type="email"
          register={register("email", {
            required: "Vui lòng nhập email",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Email không hợp lệ",
            },
          })}
          errorMessage={errors.email?.message}
        />
        <Input
          className="w-full"
          label={"Mật khẩu"}
          type="password"
          register={register("password", {
            required: "Vui lòng nhập mật khẩu",
            minLength: { value: 6, message: "Mật khẩu ít nhất 6 ký tự" },
          })}
          errorMessage={errors.password?.message}
        />
        <div className="h-11 w-full font-normal">
          <Button label={"Đăng nhập"} />
        </div>
        <div>Quên mật khẩu</div>
        <div>Hoặc đăng nhập bằng</div>
        <div className="w-full p-3 flex items-center justify-center gap-2 bg-[#4267B2] rounded-xl text-white">
          <FaFacebookSquare />
          Facebook
        </div>
        <div className="w-full p-3 flex items-center justify-center gap-2 bg-[#DB4437] rounded-xl text-white">
          <ImGoogle2 />
          Google
        </div>
      </form>
    </div>
  );
};

export default Login;
