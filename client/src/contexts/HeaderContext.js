import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import getUser from "../services/authService/getUser";
import { getAllCart } from "../services/cart";

export const HeaderContext = createContext();

const HeaderProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const handleGet = async () => {
    const response = await getUser();
    if (response?.data) {
      setUser(response.data);
    } else {
      Cookies.remove("token");
    }
  };
  const getCart = () => {
    const getData = async () => {
      const response = await getAllCart();
      setCart(response?.data);
    };
    if (Cookies.get("token")) {
      getData();
    }
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      handleGet();
    }
  }, []);
  useEffect(() => {
    getCart();
  }, []);
  return (
    <HeaderContext.Provider
      value={{ user, setUser, handleGet, cart, getCart, setCart }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
