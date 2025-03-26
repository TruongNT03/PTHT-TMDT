import instance from "../../utils/axios";

const updateProduct = async (data, content) => {
  const response = await instance.put("/product", data, {
    headers: content,
  });
  return response;
};

export default updateProduct;
