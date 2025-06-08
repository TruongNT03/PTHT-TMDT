import instance from "../../utils/axios";

const login = async ({ email, password }) => {
  try {
    const response = await instance.post("/auth/login", { email, password });
    return response;
  } catch (error) {
    return error;
  }
};

export default login;
