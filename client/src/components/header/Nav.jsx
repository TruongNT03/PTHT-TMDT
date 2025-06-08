import Cookies from "js-cookie";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { Popover, Badge, Button } from "antd";
import { Bounce, toast } from "react-toastify";

import { HeaderContext } from "../../contexts/HeaderContext";
import { deleteCartItem } from "../../services/cart";
import logout from "../../services/authService/logout";

const Nav = () => {
  const { user, setUser, cart, getCart, setCart } = useContext(HeaderContext);
  const handleDetele = async (id) => {
    const response = await deleteCartItem(id);
    if (response?.error) {
      toast.error(response?.error, {
        autoClose: 2000,
        hideProgressBar: true,
        transition: Bounce,
        closeButton: false,
      });
    } else {
      toast.success("Xóa sản phẩm thành công!", {
        autoClose: 2000,
        hideProgressBar: true,
        transition: Bounce,
        closeButton: false,
      });
    }
    getCart();
  };
  const content = (
    <div>
      {cart?.map(
        (value, index) =>
          index < 4 && (
            <div
              key={index}
              className="flex items-center rounded-md cursor-pointer hover:bg-primary hover:bg-opacity-20 "
            >
              <Link
                to={`/product/${value.product_id}`}
                key={index}
                className="flex gap-2 p-2 mb-2 hover:text-text"
              >
                <img
                  src={process.env.REACT_APP_SERVER_URL + value.image}
                  alt=""
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div>
                  <div className="max-w-[180px] truncate">{value.name}</div>
                  <div>
                    Giá:{" "}
                    {new Intl.NumberFormat().format(
                      (value?.price ? value.price : value.old_price) * 1000
                    )}
                    đ
                  </div>
                </div>
              </Link>
              <div
                className="flex-auto text-right mr-3 cursor-pointer text-blue-500 hover:text-red"
                onClick={() => handleDetele(value.id)}
              >
                Xóa
              </div>
            </div>
          )
      )}
      <div className="flex gap-5 items-center">
        <div>{cart?.length} sản phẩm trong giỏ hàng</div>
        <Link to="/cart">
          <Button type="primary">Tới giỏ hàng</Button>
        </Link>
      </div>
    </div>
  );
  const handleLogout = async () => {
    const response = await logout();
    if (response.status === 200) {
      setUser();
    }
  };

  return (
    <div className="flex h-full items-center text-white pr-[15px]">
      {user?.avatar ? (
        <img src={user?.avatar} alt="avatar" className="w-[24px] rounded-md" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M11.8575 11.6341C13.181 11.6341 14.327 11.1594 15.2635 10.2228C16.1998 9.28636 16.6747 8.14058 16.6747 6.81689C16.6747 5.49365 16.2 4.34771 15.2634 3.41098C14.3268 2.4747 13.1809 2 11.8575 2C10.5338 2 9.388 2.4747 8.45157 3.41113C7.51514 4.34756 7.04028 5.49349 7.04028 6.81689C7.04028 8.14058 7.51514 9.28652 8.45157 10.2229C9.3883 11.1592 10.5342 11.6341 11.8575 11.6341V11.6341ZM9.28042 4.23983C9.99896 3.5213 10.8418 3.17203 11.8575 3.17203C12.8729 3.17203 13.716 3.5213 14.4347 4.23983C15.1532 4.95852 15.5026 5.80157 15.5026 6.81689C15.5026 7.83251 15.1532 8.6754 14.4347 9.39409C13.716 10.1128 12.8729 10.4621 11.8575 10.4621C10.8422 10.4621 9.99926 10.1126 9.28042 9.39409C8.56173 8.67556 8.21231 7.83251 8.21231 6.81689C8.21231 5.80157 8.56173 4.95852 9.28042 4.23983Z"
            fill="white"
          ></path>
          <path
            d="M20.2863 17.379C20.2592 16.9893 20.2046 16.5642 20.1242 16.1153C20.043 15.663 19.9385 15.2354 19.8134 14.8447C19.684 14.4408 19.5084 14.0419 19.2909 13.6597C19.0656 13.2629 18.8007 12.9175 18.5034 12.6332C18.1926 12.3358 17.812 12.0967 17.372 11.9223C16.9334 11.7488 16.4475 11.6609 15.9276 11.6609C15.7234 11.6609 15.526 11.7447 15.1447 11.9929C14.91 12.146 14.6355 12.323 14.3291 12.5188C14.0671 12.6857 13.7122 12.8421 13.2738 12.9837C12.8461 13.1221 12.4118 13.1923 11.983 13.1923C11.5546 13.1923 11.1203 13.1221 10.6923 12.9837C10.2544 12.8423 9.89931 12.6859 9.63778 12.5189C9.33428 12.325 9.05962 12.148 8.82143 11.9928C8.44042 11.7445 8.24297 11.6608 8.03881 11.6608C7.51879 11.6608 7.03295 11.7488 6.59457 11.9225C6.15481 12.0966 5.77411 12.3357 5.46298 12.6334C5.16574 12.9178 4.90085 13.2631 4.67563 13.6597C4.45849 14.0419 4.28271 14.4406 4.15332 14.8448C4.02835 15.2356 3.92383 15.663 3.84265 16.1153C3.76208 16.5636 3.70761 16.9888 3.6806 17.3794C3.65405 17.7614 3.64062 18.1589 3.64062 18.5605C3.64062 19.6045 3.9725 20.4497 4.62695 21.073C5.27331 21.6881 6.12841 21.9999 7.1686 21.9999H16.7987C17.8386 21.9999 18.6937 21.6881 19.3402 21.073C19.9948 20.4501 20.3267 19.6046 20.3267 18.5603C20.3265 18.1573 20.313 17.7598 20.2863 17.379V17.379ZM18.5321 20.2238C18.105 20.6303 17.538 20.8279 16.7986 20.8279H7.1686C6.42901 20.8279 5.862 20.6303 5.43506 20.224C5.0162 19.8253 4.81265 19.281 4.81265 18.5605C4.81265 18.1857 4.82501 17.8157 4.84973 17.4605C4.87384 17.112 4.92312 16.7291 4.99621 16.3223C5.06839 15.9206 5.16025 15.5435 5.2695 15.2022C5.37433 14.8749 5.5173 14.5508 5.69461 14.2386C5.86383 13.941 6.05853 13.6858 6.27337 13.4801C6.47433 13.2877 6.72763 13.1302 7.02609 13.0121C7.30212 12.9028 7.61233 12.843 7.94909 12.834C7.99013 12.8558 8.06322 12.8975 8.18163 12.9747C8.42257 13.1317 8.70028 13.3108 9.00728 13.5069C9.35335 13.7276 9.79921 13.9268 10.3319 14.0988C10.8765 14.2749 11.4319 14.3643 11.9832 14.3643C12.5345 14.3643 13.0901 14.2749 13.6344 14.099C14.1675 13.9267 14.6132 13.7276 14.9597 13.5066C15.2739 13.3058 15.5438 13.1319 15.7848 12.9747C15.9032 12.8976 15.9763 12.8558 16.0173 12.834C16.3542 12.843 16.6644 12.9028 16.9406 13.0121C17.2389 13.1302 17.4922 13.2878 17.6932 13.4801C17.908 13.6856 18.1027 13.9409 18.2719 14.2387C18.4494 14.5508 18.5925 14.875 18.6972 15.202C18.8066 15.5438 18.8986 15.9207 18.9706 16.3222C19.0436 16.7297 19.093 17.1127 19.1171 17.4606V17.4609C19.142 17.8148 19.1545 18.1846 19.1547 18.5605C19.1545 19.2811 18.951 19.8253 18.5321 20.2238V20.2238Z"
            fill="white"
          ></path>
        </svg>
      )}

      {user ? (
        <Link to={"/profile"} className="hover:text-[#FE9614] ml-[4px]">
          {(user?.firstname || "") + " " + (user?.lastname || "")}
        </Link>
      ) : (
        <Link to={"/login"} className="hover:text-[#FE9614] ml-[4px]">
          Đăng nhập
        </Link>
      )}
      <p className="mx-1">/</p>
      {user ? (
        <Link
          to={"/"}
          onClick={() => {
            handleLogout();
            setCart([]);
          }}
          className="flex items-center hover:text-[#FE9614] after:content-[''] after:mx-[20px] after:h-6 after:w-[1px] after:bg-white after:block"
        >
          Đăng xuất
        </Link>
      ) : (
        <Link
          to={"/register"}
          className="flex items-center hover:text-[#FE9614] after:content-[''] after:mx-[20px] after:h-6 after:w-[1px] after:bg-white after:block"
        >
          Đăng ký
        </Link>
      )}
      <Popover content={content} title="Giỏ hàng">
        <Badge
          count={cart?.length}
          size="small"
          color="orange"
          showZero={false}
        >
          <Link to="/cart">
            <BsCart2 className="text-xl cursor-pointer text-white hover:text-secondary" />
          </Link>
        </Badge>
      </Popover>
    </div>
  );
};

export default Nav;
