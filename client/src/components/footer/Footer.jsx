import { CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";

const Footer = ({ className }) => {
  return (
    <div
      className={`items-center py-10 justify-center bg-primary text-white ${className}`}
    >
      <div className="w-full max-w-[1140px] mx-auto flex gap-10">
        <div className="flex-[2] mr-10">
          <div>
            <img
              src="https://bizweb.dktcdn.net/100/455/315/themes/894917/assets/logo_footer.png?1724746453440"
              alt=""
            />
          </div>
          <div className="text-xl text-secondary my-3">
            Shop Thời trang và phụ kiện Alena
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-secondary rounded-xl">
              <CiLocationOn className="text-2xl " />
            </div>
            <div>
              Tầng 6, Tòa nhà Ladeco, 266 Đội Cấn, Phường Liễu Giai, Quận Ba
              Đình, TP Hà Nội
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-secondary rounded-xl">
              <IoTimeOutline className="text-2xl" />
            </div>
            <div>
              Giờ làm việc: Từ 9:00 đến 22:00 các ngày trong tuần từ Thứ 2 đến
              Chủ nhật
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary rounded-xl">
              <MdLocalPhone className="text-2xl" />
            </div>
            <div>
              <div>Hotline</div>
              <div>1900 6750</div>
            </div>
          </div>
        </div>
        <div className="flex-[1] flex flex-col gap-3">
          <div className="font-bold text-secondary">Về chúng tôi</div>
          <div className="hover:text-secondary">Trang chủ</div>
          <div className="hover:text-secondary">Thời trang Nam</div>
          <div className="hover:text-secondary">Sản phẩm</div>
          <div className="hover:text-secondary">Bé trai</div>
          <div className="hover:text-secondary">Bé gái</div>
          <div className="hover:text-secondary">Tin tức</div>
          <div className="hover:text-secondary">Liên hệ</div>
        </div>
        <div className="flex-[1] flex flex-col gap-3">
          <div className="font-bold text-secondary">Hỗ trợ khách hàng</div>
          <div className="hover:text-secondary">Trang chủ</div>
          <div className="hover:text-secondary">Thời trang Nam</div>
          <div className="hover:text-secondary">Sản phẩm</div>
          <div className="hover:text-secondary">Bé trai</div>
          <div className="hover:text-secondary">Bé gái</div>
          <div className="hover:text-secondary">Tin tức</div>
          <div className="hover:text-secondary">Liên hệ</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
