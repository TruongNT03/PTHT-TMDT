import { createContext, useEffect, useMemo, useState } from "react";

import getUser from "../services/authService/getUser";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const handleGet = async () => {
    const data = await getUser();
    setUser((prev) => ({ ...prev, ...data.data }));
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      handleGet();
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, handleGet }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
