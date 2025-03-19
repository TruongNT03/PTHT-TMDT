import { Outlet } from "react-router-dom";

import SideBar from "../components/admin/SideBar";
import Navbar from "../components/admin/Navbar";
import Direction from "../components/admin/Direction";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar className={"w-[300px] bg-primary"} />
      <div className="flex flex-col flex-1 bg-light">
        <Navbar />
        <Direction />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
