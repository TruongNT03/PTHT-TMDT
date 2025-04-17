import instance from "../../utils/axios";

const changeAddress = async ({ id, name, address, phone, is_default }) => {
  try {
    const response = await instance.put("/address", {
      id,
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

export default changeAddress;
