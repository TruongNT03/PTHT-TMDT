import instance from "../utils/axios";

const getMessageLogs = async () => {
  try {
    const response = await instance.get("/chat");
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { getMessageLogs };
