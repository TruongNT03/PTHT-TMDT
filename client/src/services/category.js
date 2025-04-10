import instance from "../utils/axios";

const getAllCategory = async () => {
  const response = await instance.get("/category");
  return response;
};

export { getAllCategory };
