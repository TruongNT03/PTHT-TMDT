import { useEffect } from "react";
import Cookies from "js-cookie";

import getUser from "../services/authService/getUser";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAdmin = async () => {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await getUser();
      if (response?.data?.role !== "admin") {
        navigate("/");
      }
    };
    checkAdmin();
  }, [navigate]);
  return <Outlet />;
};

export default AdminRoute;
