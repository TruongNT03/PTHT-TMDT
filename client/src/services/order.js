import instance from "../utils/axios";

const getAllOrder = async () => {
  const response = await instance.get("/order");
  return response;
};

const insertOrder = async ({ card_item_ids, method }) => {
  const response = await instance.post("/order", { card_item_ids, method });
  return response;
};

export { getAllOrder, insertOrder };
