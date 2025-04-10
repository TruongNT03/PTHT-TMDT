import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import SubNav from "../components/header/SubNav";
import { Outlet, useLocation } from "react-router-dom";
import Loading from "../components/loading/Loading";

const MainLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [pathname]);
  return (
    <div className="w-full">
      {isLoading && <Loading />}
      <header className="w-full py-[23px] mx-auto bg-primary flex items-center justify-center">
        <Header />
      </header>
      <nav className="w-full h-[60px] mx-auto bg-light flex items-center justify-center">
        <SubNav />
      </nav>
      <div className="w-full bg-light-blue">
        <Outlet />
      </div>
      <Footer className="w-full" />
    </div>
  );
};

export default MainLayout;
