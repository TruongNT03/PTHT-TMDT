import instance from "../../utils/axios";

const insertProduct = async (data, content) => {
  const response = await instance.post("/product", data, {
    headers: content,
  });
  return response;
};

export default insertProduct;
