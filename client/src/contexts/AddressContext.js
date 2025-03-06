import { createContext, useState } from "react";

export const AddressContext = createContext();

const AddressProvider = ({ children }) => {
  const [close, setClose] = useState(true);
  const [data, setData] = useState({
    name: "",
    address: "",
    phone: "",
    defaul: false,
  });
  const [listData, setListData] = useState([
    {
      name: "Trường",
      address: "",
      phone: "",
      defaul: true,
    },
    {
      name: "Trường Nguyễn",
      address: "",
      phone: "",
      defaul: false,
    },
  ]);
  return (
    <AddressContext.Provider
      value={{ close, setClose, listData, setListData, data, setData }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default AddressProvider;
