import instance from "../../utils/axios";

const uploadProductImage = async (data) => {
  const response = await instance.post("/product/image", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export default uploadProductImage;
