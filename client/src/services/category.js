import instance from "../utils/axios";

const getAllCategory = async () => {
  const response = await instance.get("/category");
  return response;
};
const insertCategory = async (name) => {
  const response = await instance.post("/category", name);
  return response;
};

export { getAllCategory, insertCategory };
