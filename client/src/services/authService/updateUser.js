import instance from "../../utils/axios";

const changePassword = async (body) => {
  try {
    const response = await instance.put("/auth", body);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default changePassword;
