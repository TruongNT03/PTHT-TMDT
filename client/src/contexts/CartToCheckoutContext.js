import { createContext, useState } from "react";

export const CartToCheckoutContext = createContext();

const CartToCheckoutProvider = ({ children }) => {
  const [selected, setSelected] = useState([]);
  return (
    <CartToCheckoutContext.Provider value={{ selected, setSelected }}>
      {children}
    </CartToCheckoutContext.Provider>
  );
};

export default CartToCheckoutProvider;
