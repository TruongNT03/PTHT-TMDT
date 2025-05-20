import instance from "../../utils/axios";

const getRecommend = async (id) => {
  return await instance.get(`/product/recommend/${id}`);
};

export default getRecommend;
