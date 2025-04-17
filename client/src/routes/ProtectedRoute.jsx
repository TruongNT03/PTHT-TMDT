import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = Cookies.get("token");
  return token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
