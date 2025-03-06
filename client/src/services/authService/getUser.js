import instance from "../../utils/axios";

const getUser = async () => {
  try {
    const response = await instance.get("/auth");
    return response;
  } catch (error) {
    return error;
  }
};

export default getUser;
