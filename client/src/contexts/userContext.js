import { createContext, useEffect, useState } from "react";

import getUser from "../services/authService/getUser";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const handleGet = async () => {
    const user = await getUser();
    setUser(user.data.firstName + " " + user.data.lastName);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      handleGet();
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
