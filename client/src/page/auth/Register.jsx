import { Link, useNavigate } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { ImGoogle2 } from "react-icons/im";
import { set, useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { Bounce, ToastContainer, toast } from "react-toastify";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import signIn from "../../services/authService/register";
import { useRef } from "react";

const Register = ({ classname }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const captchaValue = captchaRef.current?.getValue();
      if (!captchaValue) {
        toast.error("Vui lòng xác minh CAPTCHA!", {
          autoClose: 2000,
          transition: Bounce,
          closeButton: false,
          hideProgressBar: true,
        });
        return;
      }
      const response = await signIn(data);
      if (response?.data) {
        toast.success(
          <>
            Đăng ký thành công! <br />
            Đang chuyển hướng đến trang đăng nhập...
          </>,
          {
            autoClose: 2000,
            transition: Bounce,
            closeButton: false,
            hideProgressBar: true,
          }
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.message, {
          autoClose: 2000,
          transition: Bounce,
          closeButton: false,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!", {
        autoClose: 2000,
        transition: Bounce,
        closeButton: false,
        hideProgressBar: true,
      });
    }
  };

  const captchaRef = useRef(null);

  const password = watch("password");

  return (
    <div className={`${classname}w-full py-16`}>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[368px] items-center gap-[15px] p-6 rounded-xl mx-auto shadow-2xl"
      >
        <div className="text-[26px] uppercase">Đăng ký</div>
        <div className="text-[14px]">
          Nếu bạn đã có tài khoản,{" "}
          <Link to={"/login"} className="text-primary">
            đăng nhập tại đây
          </Link>
        </div>
        <Input
          label={"Họ"}
          className={"w-full"}
          register={register("firstname", {
            required: "Vui lòng nhập họ",
            pattern: {
              value: /^[A-Za-zÀ-Ỹà-ỹĂăÂâĐđÊêÔôƠơƯư\s]+$/,
              message: "Tên chỉ gồm các chữ cái",
            },
          })}
          errorMessage={errors.firstname?.message}
        />
        <Input
          label={"Tên"}
          className={"w-full"}
          register={register("lastname", {
            pattern: {
              value: /^[A-Za-zÀ-Ỹà-ỹĂăÂâĐđÊêÔôƠơƯư\s]+$/,
              message: "Tên chỉ gồm các chữ cái",
            },
            required: "Vui lòng nhập tên",
          })}
          errorMessage={errors.lastname?.message}
        />
        <Input
          label={"Email"}
          className={"w-full"}
          register={register("email", {
            required: "Vui lòng nhập Email",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Email không hợp lệ",
            },
          })}
          errorMessage={errors.email?.message}
        />
        {/* <Input
          label={"Số điện thoại"}
          className={"w-full"}
          register={register("phoneNumber", {
            pattern: {
              value: /^[0-9]+$/,
              message: "Số điện thoại chỉ chứa các chữ số",
            },
            required: "Vui lòng nhập số điện thoại",
          })}
          errorMessage={errors.phoneNumber?.message}
        /> */}
        <Input
          label={"Mật khẩu"}
          type="password"
          className={"w-full"}
          register={register("password", {
            required: "Vui lòng nhập họ",
          })}
          errorMessage={errors.password?.message}
        />
        <Input
          label={"Nhập lại mật khẩu"}
          type="password"
          className={"w-full"}
          register={register("rePassword", {
            required: "Vui lòng nhập lại mật khẩu",
            validate: (value) => {
              if (value !== password) return "Mật khẩu không trùng nhau";
            },
          })}
          errorMessage={errors.rePassword?.message}
        />
        <ReCAPTCHA ref={captchaRef} sitekey={process.env.REACT_APP_SITE_KEY} />
        <Button label={"Đăng ký"} className={"w-full"} />
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

export default Register;
