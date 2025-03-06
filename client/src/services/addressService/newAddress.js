import instance from "../../utils/axios";

const getAddress = async (body) => {
  try {
    const response = await instance.post("/address", body);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default getAddress;
