import instance from "../../utils/axios";

const logout = async () => {
  try {
    const response = await instance.post("/auth/logout");
    return response;
  } catch (error) {
    return error;
  }
};

export default logout;
