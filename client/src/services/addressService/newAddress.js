import instance from "../../utils/axios";

const newAddress = async ({ name, address, phone, is_default }) => {
  try {
    const response = await instance.post("/address", {
      name,
      address,
      phone,
      is_default,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default newAddress;
