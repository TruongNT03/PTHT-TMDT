import instance from "../../utils/axios";

const getProductById = async (id) => {
  const response = await instance.get(`/product/${id}`);
  return response;
};

export default getProductById;
