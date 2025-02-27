import Header from "../components/header/Header";
import SubNav from "../components/header/SubNav";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full">
      <header className="w-full py-[23px] mx-auto bg-primary flex items-center justify-center">
        <Header />
      </header>
      <nav className="w-full h-[60px] mx-auto bg-light flex items-center justify-center">
        <SubNav />
      </nav>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
