import instance from "../../utils/axios";

const login = async ({ email, password }) => {
  try {
    const response = await instance.post("/auth/login", { email, password });
    localStorage.setItem("token", response.token);
    // response?.token ?? localStorage.setItem("token", response.token);
    console.log(response.token);
    return response;
  } catch (error) {
    return error;
  }
};

export default login;
