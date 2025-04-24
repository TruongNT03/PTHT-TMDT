import instance from "../utils/axios";

const addToCart = async (data) => {
  const response = await instance.post("/cart", data);
  return response;
};

const getAllCart = async () => {
  const response = await instance.get("/cart");
  return response;
};

const deleteCartItem = async (id) => {
  const response = await instance.delete(`/cart/${id}`);
  return response;
};

const updateCartItem = async (id, quantity) => {
  const response = await instance.put("/cart", {
    id: id,
    quantity: quantity,
  });
  return response;
};

export { addToCart, getAllCart, deleteCartItem, updateCartItem };
