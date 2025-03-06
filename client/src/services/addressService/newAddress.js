import instance from "../../utils/axios";

const newAddress = async ({ name, address, phone, isDefault }) => {
  try {
    const response = await instance.post("/address", {
      name,
      address,
      phone,
      isDefault,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default newAddress;
