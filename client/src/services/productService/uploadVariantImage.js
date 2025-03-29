import instance from "../../utils/axios";

const uploadVariantImage = async (data) => {
  const response = await instance.post("/variant/image", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export default uploadVariantImage;
