import { useEffect } from "react";

import getUser from "../services/authService/getUser";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await getUser();
      if (response?.data?.role !== "ADMIN") {
        navigate("/");
      }
    };
    checkAdmin();
  }, [navigate]);
  return <Outlet />;
};

export default AdminRoute;
