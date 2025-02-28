import instance from "../../utils/axios";

const login = async (email, password) => {
  try {
    const response = await instance.post("/auth/login", { email, password });
    const { token } = response.data;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default login;
