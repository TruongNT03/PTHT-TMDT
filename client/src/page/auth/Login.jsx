import { FaFacebookSquare } from "react-icons/fa";
import { ImGoogle2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";

import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import login from "../../services/authService/login";
import { UserContext } from "../../contexts/userContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await login(data);
    if (res?.token) {
      setUser(res.data.firstName + " " + res.data.lastName);
      navigate("/");
    } else {
      alert("Tài khoản mật khẩu không chính xác!");
    }
  };

  const [displayForgotPassword, setdisplayForgotPassword] = useState(false);
  const handleDisplayForgotPassword = () => {
    setdisplayForgotPassword((prev) => !prev);
  };

  const email = watch("email");
  const password = watch("password");
  const remail = watch("remail");

  return (
    <div className="w-full py-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[368px] items-center gap-[15px] p-6 rounded-xl mx-auto shadow-2xl"
      >
        <div className="text-[26px] uppercase">Đăng nhập</div>
        <div className="text-[14px]">
          Nếu bạn chưa có tài khoản,{" "}
          <Link className="text-primary" to={"/register"}>
            đăng ký tại đây
          </Link>
        </div>
        <Input
          className="w-full"
          label="Email"
          type="email"
          register={register("email", {
            validate: (value) => {
              if (!remail && !value) return "Vui lòng nhập email";
              return true;
            },
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
            validate: (value) => {
              if (!remail && !value) return "Vui lòng nhập email";
              return true;
            },
            minLength: { value: 6, message: "Mật khẩu ít nhất 6 ký tự" },
          })}
          errorMessage={errors.password?.message}
        />
        <Button label={"Đăng nhập"} className={"w-full"} />
        <div
          className="cursor-pointer hover:text-secondary"
          onClick={handleDisplayForgotPassword}
        >
          Quên mật khẩu
        </div>
        {!displayForgotPassword ? (
          <></>
        ) : (
          <div className="w-full">
            <Input
              label={"Email"}
              className={"w-full mt-3"}
              type="email"
              register={register("remail", {
                validate: (value) => {
                  if ((email || password) && value)
                    return "Vui lòng nhập email";
                  return true;
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email không hợp lệ",
                },
              })}
              errorMessage={errors.remail?.message}
            />
            <Button label={"Lấy lại mật khẩu"} className={"mt-[15px]"} />
          </div>
        )}

        <div>Hoặc đăng nhập bằng</div>
        <div className="w-full p-2 flex items-center justify-center gap-2 bg-[#4267B2] rounded-xl text-white">
          <FaFacebookSquare fontSize={32} />
          Facebook
        </div>
        <div className="w-full p-2 flex items-center justify-center gap-2 bg-[#DB4437] rounded-xl text-white">
          <ImGoogle2 fontSize={32} />
          Google
        </div>
      </form>
    </div>
  );
};

export default Login;
