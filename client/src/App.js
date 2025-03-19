import MainLayout from "./layout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
import UserProvider from "./contexts/userContext";
import Profile from "./page/Profile";
import UserInfo from "./components/profile/UserInfo";
import Order from "./components/profile/Order";
import ChangePassword from "./components/profile/ChangePassword";
import Address from "./components/profile/Address";
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./layout/AdminLayout";
import Product from "./page/admin/Product";
import Dashboard from "./page/admin/Dashboard";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="product" element={<Product />} />
            </Route>
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />}>
              <Route index path="" element={<UserInfo />} />
              <Route path="order" element={<Order />} />
              <Route path="changepassword" element={<ChangePassword />} />
              <Route path="address" element={<Address />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
