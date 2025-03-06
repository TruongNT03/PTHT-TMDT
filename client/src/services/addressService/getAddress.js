import instance from "../../utils/axios";

const getAddress = async () => {
  try {
    const response = await instance.get("/address");
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default getAddress;
