import instance from "../../utils/axios";

const insertProduct = async (formData) => {
  const response = await instance.post("/product", formData);
  return response;
};

export default insertProduct;
