import { use, useContext, useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import SubNav from "../components/header/SubNav";
import { Outlet, useLocation } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { LoadingContext } from "../contexts/LoadingContext";
import Chat from "../components/chat/Chat";

const MainLayout = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const { pathname } = useLocation();
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, [pathname]);
  const { loading, setLoading } = useContext(LoadingContext);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, loading]);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);
  return (
    <div className="w-full relative">
      {loading && <Loading />}
      <header className="w-full py-[23px] mx-auto bg-primary flex items-center justify-center">
        <Header />
      </header>
      <nav className="w-full h-[60px] mx-auto bg-light flex items-center justify-center">
        <SubNav />
      </nav>
      <div className="w-full bg-light-blue">
        <Outlet />
      </div>
      <div className="fixed right-5 bottom-5">
        <Chat />
      </div>
      <Footer className="w-full" />
    </div>
  );
};

export default MainLayout;
