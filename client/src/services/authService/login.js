import instance from "../../utils/axios";
import Cookies from "js-cookie";

const login = async ({ email, password }) => {
  try {
    const response = await instance.post("/auth/login", { email, password });
    Cookies.set("token", response.token, { expires: 7 });
    return response;
  } catch (error) {
    return error;
  }
};

export default login;
