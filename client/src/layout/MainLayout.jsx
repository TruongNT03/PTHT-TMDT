import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import SubNav from "../components/header/SubNav";
import { Outlet } from "react-router-dom";
// import Navigate from "../components/navigate/Navigate";

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
        {/* <Navigate className={"w-full max-w-[1110px] mx-auto text-sm py-8"} /> */}
        <Outlet />
      </div>
      <Footer className="w-full h-[300px]" />
    </div>
  );
};

export default MainLayout;
