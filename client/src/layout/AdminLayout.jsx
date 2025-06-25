import { Outlet, useLocation } from "react-router-dom";

import SideBar from "../components/admin/SideBar";
import Navbar from "../components/admin/Navbar";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/loading/Loading";
import { LoadingContext } from "../contexts/LoadingContext";
import Chat from "../components/chat/Chat";
// import Direction from "../components/admin/Direction";

const AdminLayout = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const { pathname } = useLocation();
  // useEffect(() => {
  //   setIsLoading(true);
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [pathname]);
  const { loading, setLoading } = useContext(LoadingContext);
  const { pathname } = useLocation();
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
    <div className="flex h-screen">
      <SideBar className={"w-[300px] bg-primary h-screen"} />
      <div className="flex-1 bg-light-blue overflow-y-scroll">
        <Navbar />
        {/* <Direction /> */}
        {loading ? <Loading /> : <Outlet />}
      </div>
      <div className="fixed bottom-5 right-5">
        <Chat isUser={false} />
      </div>
    </div>
  );
};

export default AdminLayout;
