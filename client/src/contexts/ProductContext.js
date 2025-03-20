import { createContext, useEffect, useState } from "react";
import { getAllProduct } from "../services/productService/getAllProduct";

export const ProductContext = createContext();

const ProductProvide = ({ children }) => {
  const [data, setData] = useState({});
  const [isClose, setIsClose] = useState(true);
  const [dialogData, setDialogData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    subCategory: "",
    section: "",
  });
  const getData = async () => {
    const response = await getAllProduct();
    setData(response);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ProductContext.Provider
      value={{
        data,
        setData,
        isClose,
        setIsClose,
        dialogData,
        setDialogData,
        getData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvide;
