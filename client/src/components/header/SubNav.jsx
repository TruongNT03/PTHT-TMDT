import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

const SubNav = () => {
  return (
    <div className="w-full max-w-[1140px] px-[15px] flex justify-between font-semibold text-[15px] text-primary">
      <ul className="flex gap-9 items-center">
        <Link
          to={"/"}
          className="border-b-[3px] border-t-[3px] border-secondary border-t-transparent text-secondary py-1"
        >
          Trang chủ
        </Link>
        <Link className="py-1 flex items-center gap-1 hover:text-secondary group">
          Thời trang Nam
          <IoMdArrowDropdown
            fontSize={20}
            className="group-hover:rotate-180 transition duration-700 ease-in-out"
          />
        </Link>
        <Link className="py-1 flex items-center gap-1 hover:text-secondary group">
          Thời trang Nữ
          <IoMdArrowDropdown
            fontSize={20}
            className="group-hover:rotate-180 transition duration-700 ease-in-out"
          />
        </Link>
        <Link className="py-1 hover:text-secondary">Trẻ em</Link>
        <Link className="py-1 hover:text-secondary">Tin tức</Link>
        <Link className="py-1 hover:text-secondary">Liên hệ</Link>
      </ul>
      <div className="flex items-center gap-2 before:content-[''] before:w-[1px] before:h-[24px] before:inline-block before:bg-primary before:mr-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M7.0026 1.73991L7.81809 2.39884C9.15027 3.47525 9.3185 5.4399 8.18875 6.72742L8.07556 6.85642C7.26593 7.77912 7.04991 9.14192 7.85868 10.0643C8.63222 10.9465 9.67036 11.7227 11.1784 12.5682C12.3675 13.235 13.8544 12.9186 14.7532 11.8942L14.832 11.8045C15.9034 10.5834 17.7512 10.4249 19.0146 11.4458L19.7715 12.0573C20.8569 12.9344 21.2348 14.4653 20.4545 15.6219C19.7181 16.7134 18.8967 17.5674 17.9272 18.2654C17.3087 18.7107 16.512 18.8096 15.7757 18.6119C8.57753 16.6789 4.223 13.167 1.09904 6.66232C0.827031 6.09593 0.737959 5.44474 0.958532 4.85622C1.42443 3.61316 2.29572 2.56629 3.64249 1.56464C4.64717 0.817412 6.02944 0.953575 7.0026 1.73991Z"
            stroke="#1C5B41"
            stroke-width="1.5"
          ></path>
          <path
            d="M3.32318 2.79199L8.30918 6.82076"
            stroke="#1C5B41"
            stroke-width="1.5"
          ></path>
          <path
            d="M17.4891 2.54224L14.8114 5.20087"
            stroke="#1C5B41"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path>
          <path
            d="M18.9584 6.37634L16.9225 7.08326"
            stroke="#1C5B41"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path>
          <path
            d="M12.9167 3.0647L13.6407 1.04166"
            stroke="#1C5B41"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path>
          <path
            d="M14.9571 12.1924L19.9431 16.2211"
            stroke="#1C5B41"
            stroke-width="1.5"
          ></path>
        </svg>
        <div className="flex">
          Hotline: <div className="ml-[8px]">1900 6750</div>
        </div>
      </div>
    </div>
  );
};

export default SubNav;
