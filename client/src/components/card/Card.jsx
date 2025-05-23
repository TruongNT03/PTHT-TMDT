import { Link } from "react-router-dom";

const Card = ({ className, image, data }) => {
  return (
    <div className={`${className}`}>
      <div className="w-[206px] h-[206px] rounded-xl overflow-hidden mb-[10px] relative group cursor-pointer">
        <Link to={`/product/${data?.id}`}>
          <img
            src={process.env.REACT_APP_SERVER_URL + image}
            alt=""
            className="object-cover w-full h-full"
          />
        </Link>
        <Link className="absolute bottom-0 text-white flex text-xs items-center justify-center w-full h-[35px] bg-gray hover:bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            className="mr-2"
          >
            <path
              d="M18.7179 6.86766C18.467 6.55289 18.0906 6.37232 17.6852 6.37232H14.026L12.0418 1.82891C11.9188 1.54721 11.5907 1.41848 11.309 1.54157C11.0272 1.66459 10.8986 1.99274 11.0216 2.27448L12.8112 6.37236H6.18877L7.97837 2.27448C8.10139 1.99274 7.97276 1.66462 7.69103 1.54157C7.40933 1.41848 7.08117 1.54713 6.95816 1.82891L4.97396 6.37236H1.31482C0.909367 6.37236 0.532967 6.55289 0.282071 6.86769C0.0357758 7.17674 -0.0551051 7.57403 0.0327328 7.95782L1.9868 16.493C2.12325 17.089 2.65046 17.5052 3.26889 17.5052H15.7311C16.3495 17.5052 16.8767 17.089 17.0132 16.493L18.9673 7.95778C19.0551 7.574 18.9642 7.1767 18.7179 6.86766ZM15.7311 16.3919H3.26889C3.17437 16.3919 3.09158 16.3299 3.07203 16.2445L1.11796 7.70937C1.10263 7.64239 1.12835 7.59199 1.15269 7.56153C1.17526 7.53318 1.22636 7.48564 1.31482 7.48564H4.48779L4.34198 7.81951C4.21897 8.10125 4.34759 8.42937 4.62932 8.55242C4.70183 8.58411 4.77739 8.59911 4.85179 8.59911C5.06636 8.59911 5.27083 8.47431 5.36219 8.26512L5.7026 7.48571H13.2975L13.6379 8.26512C13.7292 8.47434 13.9337 8.59911 14.1483 8.59911C14.2226 8.59911 14.2982 8.58411 14.3708 8.55242C14.6525 8.42941 14.7811 8.10125 14.6581 7.81951L14.5123 7.48564H17.6853C17.7737 7.48564 17.8248 7.53318 17.8474 7.56153C17.8717 7.59203 17.8974 7.64243 17.8821 7.70933L15.928 16.2445C15.9085 16.3299 15.8256 16.3919 15.7311 16.3919Z"
              fill="white"
            ></path>
            <path
              d="M6.16016 9.89771C5.85274 9.89771 5.60352 10.1469 5.60352 10.4543V14.5364C5.60352 14.8438 5.85274 15.093 6.16016 15.093C6.46757 15.093 6.7168 14.8438 6.7168 14.5364V10.4543C6.7168 10.1469 6.46761 9.89771 6.16016 9.89771Z"
              fill="white"
            ></path>
            <path
              d="M9.5 9.89771C9.19259 9.89771 8.94336 10.1469 8.94336 10.4543V14.5364C8.94336 14.8438 9.19259 15.093 9.5 15.093C9.80741 15.093 10.0566 14.8438 10.0566 14.5364V10.4543C10.0566 10.1469 9.80741 9.89771 9.5 9.89771Z"
              fill="white"
            ></path>
            <path
              d="M12.8398 9.89771C12.5324 9.89771 12.2832 10.1469 12.2832 10.4543V14.5364C12.2832 14.8438 12.5324 15.093 12.8398 15.093C13.1473 15.093 13.3965 14.8438 13.3965 14.5364V10.4543C13.3964 10.1469 13.1473 9.89771 12.8398 9.89771Z"
              fill="white"
            ></path>
          </svg>
          Thêm vào giỏ hàng
        </Link>
      </div>
      <div className="font-semibold text-[14px] mb-[8px] truncate w-[200px] overflow-hidden">
        {data?.name}
      </div>
      <div className="flex gap-2 text-base font-semibold text-secondary">
        {new Intl.NumberFormat().format(data?.price * 1000)} Đ
        {/* <del className="text text-[14px] font-light text-black">130.000Đ</del> */}
      </div>
    </div>
  );
};

export default Card;
