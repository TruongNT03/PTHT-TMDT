import instance from "../../utils/axios";

const updateProduct = async (data, id) => {
  const response = await instance.put(`/product/${id}`, {
    ...data,
  });
  return response;
};

export default updateProduct;
