import MainLayout from "./layout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
import HeaderProvider from "./contexts/HeaderContext";
import Profile from "./page/Profile";
import UserInfo from "./components/profile/UserInfo";
import Order from "./components/profile/Order";
import ChangePassword from "./components/profile/ChangePassword";
import Address from "./components/profile/Address";
import AdminRoute from "./routes/AdminRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import AdminLayout from "./layout/AdminLayout";
import Product from "./page/admin/Product";
import Dashboard from "./page/admin/Dashboard";
import ProductProvide from "./contexts/ProductContext";
import ProductDetail from "./page/ProductDetail";
import NotFound from "./page/NotFound";
import ListProduct from "./page/ListProduct";
import CreateProduct from "./page/admin/CreateProduct";
import EditProduct from "./page/admin/EditProduct";
import Category from "./page/admin/Category";
import Section from "./page/admin/Section";
import Cart from "./page/Cart";
import Checkout from "./page/Checkout";
import CartToCheckoutProvider from "./contexts/CartToCheckoutContext";

function App() {
  return (
    <HeaderProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="product/edit/:id" element={<EditProduct />} />
              <Route path="product/new" element={<CreateProduct />} />
              <Route path="category" element={<Category />} />
              <Route path="section" element={<Section />} />
              <Route
                path="product"
                element={
                  <ProductProvide>
                    <Product />
                  </ProductProvide>
                }
              />
            </Route>
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route element={<PublicRoute />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />}>
                <Route index path="" element={<UserInfo />} />
                <Route path="order" element={<Order />} />
                <Route path="changepassword" element={<ChangePassword />} />
                <Route path="address" element={<Address />} />
              </Route>
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/product" element={<ListProduct />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/cart"
                element={
                  <CartToCheckoutProvider>
                    <Cart />
                  </CartToCheckoutProvider>
                }
              />
              <Route
                path="/checkout"
                element={
                  <CartToCheckoutProvider>
                    <Checkout />
                  </CartToCheckoutProvider>
                }
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HeaderProvider>
  );
}

export default App;
