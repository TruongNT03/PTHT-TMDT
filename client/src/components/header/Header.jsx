import Search from "./Search";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full h-[44px] max-w-[1140px] flex items-center justify-between text-sm">
      <div className="pl-[15px]">
        <Link to={"/"}>
          <img
            src="https://bizweb.dktcdn.net/100/455/315/themes/894917/assets/logo.png?1724746453440"
            alt=""
            className=""
          />
        </Link>
      </div>
      <Search />
      <Nav />
    </div>
  );
};

export default Header;
