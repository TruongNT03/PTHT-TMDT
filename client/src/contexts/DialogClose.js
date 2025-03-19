import { createContext, useState } from "react";

export const DialogCloseContext = createContext();

const DialogProvider = (children) => {
  const [close, setClose] = useState(true);
  const [data, setData] = useState({});
  return (
    <DialogCloseContext.Provider value={{ close, setClose }}>
      {children}
    </DialogCloseContext.Provider>
  );
};
export default DialogProvider;
