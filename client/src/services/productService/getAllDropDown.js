import instance from "../../utils/axios";

const getAllDropDown = async (name) => {
  const response = await instance.get(`/${name}`);
  return response;
};

export default getAllDropDown;
