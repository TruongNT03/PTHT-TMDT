import { createContext, useEffect, useState } from "react";
import { getAllProduct } from "../services/productService/getAllProduct";

export const ProductContext = createContext();

const ProductProvide = ({ children }) => {
  const [data, setData] = useState({});
  const [isClose, setIsClose] = useState(true);
  const [dialogData, setDialogData] = useState();
  useEffect(() => {
    const getData = async () => {
      const response = await getAllProduct();
      setData(response);
    };
    getData();
  }, []);
  return (
    <ProductContext.Provider
      value={{ data, setData, isClose, setIsClose, dialogData, setDialogData }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvide;
