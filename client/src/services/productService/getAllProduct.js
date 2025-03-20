import instance from "../../utils/axios";

const getAllProduct = async (page = 2) => {
  return await instance.get("/product", {
    params: {
      page: page,
    },
  });
};

export { getAllProduct };
