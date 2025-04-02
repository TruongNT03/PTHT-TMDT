import { Outlet, useLocation } from "react-router-dom";

import SideBar from "../components/admin/SideBar";
import Navbar from "../components/admin/Navbar";
import { useEffect, useState } from "react";
import Loading from "../components/loading/Loading";
// import Direction from "../components/admin/Direction";

const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
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
        {isLoading ? <Loading /> : <Outlet />}
      </div>
    </div>
  );
};

export default AdminLayout;
