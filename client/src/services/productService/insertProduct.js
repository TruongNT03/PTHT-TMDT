import instance from "../../utils/axios";

const insertProduct = async (product) => {
  const response = await instance.post("/product", product, {});
  return response;
};

export default insertProduct;
