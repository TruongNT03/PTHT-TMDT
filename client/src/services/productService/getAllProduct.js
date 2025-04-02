import instance from "../../utils/axios";

const getAllProduct = async (searchParams) => {
  return await instance.get("/product", {
    params: searchParams,
  });
};

export default getAllProduct;
