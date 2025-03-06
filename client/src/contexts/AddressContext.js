import { createContext, useEffect, useState } from "react";

import getAddress from "../services/addressService/getAddress";

export const AddressContext = createContext();

const AddressProvider = ({ children }) => {
  const apiData = async () => {
    const response = await getAddress();
    setListData(response.data);
  };
  useEffect(() => {
    apiData();
  }, []);
  const [close, setClose] = useState(true);
  const [data, setData] = useState({
    id: 0,
    name: "",
    address: "",
    phone: "",
    isDefault: false,
  });
  const [listData, setListData] = useState([]);
  return (
    <AddressContext.Provider
      value={{ close, setClose, listData, setListData, data, setData }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default AddressProvider;
