import instance from "../../utils/axios";

const deleteProduct = async (id) => {
  const response = await instance.delete(`/product/${id}`);
  return response;
};

export default deleteProduct;
