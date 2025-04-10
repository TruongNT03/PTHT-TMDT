import instance from "../utils/axios";

const getAllSection = async () => {
  const response = await instance.get("/section");
  return response;
};

export { getAllSection };
