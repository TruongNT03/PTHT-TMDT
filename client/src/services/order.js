import instance from "../utils/axios";

const getAllOrder = async () => {
  const response = await instance.get("/order");
  return response;
};

const insertOrder = async ({ card_item_ids, method, address_id }) => {
  const response = await instance.post("/order", {
    card_item_ids,
    method,
    address_id,
  });
  return response;
};

const updateOrder = async ({ id, payment, status }) => {
  const response = await instance.put("/order", {
    id,
    status,
    payment,
  });
};

export { getAllOrder, insertOrder, updateOrder };
