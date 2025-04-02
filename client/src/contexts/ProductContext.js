import { createContext, useEffect, useState } from "react";
import getAllProduct from "../services/productService/getAllProduct";
import { useSearchParams } from "react-router-dom";

export const ProductContext = createContext();

const ProductProvide = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [dialogData, setDialogData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    subCategoryId: 1,
    sectionId: 1,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const getData = async (searchParams) => {
    setLoading(true);
    const response = await getAllProduct(searchParams);
    setData(response);
    setLoading(false);
  };
  useEffect(() => {
    getData(searchParams);
  }, [searchParams]);
  return (
    <ProductContext.Provider
      value={{
        data,
        setData,
        dialogData,
        setDialogData,
        getData,
        searchParams,
        setSearchParams,
        visible,
        setVisible,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvide;
