import Card from "../card/Card";
import Button from "../button/Button";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";

const Section = ({ children, title = "SẢN PHẨM HOT", button = true }) => {
  return (
    <div className="w-full max-w-[1140px] mx-auto py-10">
      <div className="w-[100px] h-[2px] bg-secondary"></div>
      <div className="flex justify-between items-center">
        <div className="uppercase font-bold text-primary text-[40px] py-7">
          {title}
        </div>
        {/* <div className="flex font-semibold gap-[10px] items-center">
          <MdArrowBack fontSize={20} className="mr-3" />
          <div className="bg-secondary py-2 px-5 rounded-lg text-white">
            Quần áo
          </div>
          <div className="py-2 px-5 rounded-md hover:bg-secondary hover:text-white">
            Phụ kiện
          </div>
          <div className="py-2 px-5 rounded-md hover:bg-secondary hover:text-white">
            Giầy dép
          </div>
          <div className="py-2 px-5 rounded-md hover:bg-secondary hover:text-white">
            Bé gái
          </div>
          <div className="py-2 px-5 rounded-md hover:bg-secondary hover:text-white">
            Bé trai
          </div>
          <MdArrowForward fontSize={20} className="ml-3" />
        </div> */}
      </div>
      <div className="w-full flex justify-between flex-wrap gap-y-6">
        {children}
      </div>
      {button && (
        <div className="w-[241px] h-[62px] mx-auto mt-10 font-bold">
          <Link to="/product">
            <Button label={"Xem tất cả"} className={"px-5"} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Section;
