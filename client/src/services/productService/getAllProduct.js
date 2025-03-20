import instance from "../../utils/axios";

const getAllProduct = async (page = 1, orderBy, search) => {
  return await instance.get("/product", {
    params: {
      page: page,
    },
  });
};

export { getAllProduct };
