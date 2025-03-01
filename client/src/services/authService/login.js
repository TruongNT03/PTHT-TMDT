import instance from "../../utils/axios";

const login = async (email, password) => {
  try {
    const response = await instance.post("/auth/login", { email, password });
    console.log(response);
    const token = response.token;
    localStorage.setItem("token", token);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default login;
