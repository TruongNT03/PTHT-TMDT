import instance from "../../utils/axios";

const updateProduct = async (body) => {
  const response = await instance.put("/product", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export default updateProduct;
