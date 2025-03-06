import instance from "../../utils/axios";

const deleteAddress = async ({ id }) => {
  try {
    const response = await instance.delete("/address", {
      params: {
        id: id,
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default deleteAddress;
