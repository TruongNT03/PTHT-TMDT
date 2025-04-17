import instance from "../utils/axios";

const getAllSection = async () => {
  const response = await instance.get("/section");
  return response;
};
const insertSection = async (name) => {
  console.log(name);
  const response = await instance.post("/section", name);
  return response;
};

export { getAllSection, insertSection };
