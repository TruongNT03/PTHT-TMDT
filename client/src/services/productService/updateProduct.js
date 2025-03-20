import instance from "../../utils/axios";

const updateProduct = async (body) => {
  const response = await instance.put("/product", body);
  return response;
};

export default updateProduct;
