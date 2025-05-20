import db from "../models/index.js";

const getDashboard = async (req, res) => {
  const data = new Date();
  const day = data.getDate();
  const month = data.getMonth() + 1;
  const year = data.getFullYear();
  console.log(day, month, year);
  const product = await db.products.count();
  const order = await db.orders.findAll();
  let totalMoney = 0;
  order.forEach((item) => {
    totalMoney += item.total_price;
  });
  return res.status(200).json({
    message: "Dashboard",
    product,
    order: order.length,
    totalMoney,
  });
};

export { getDashboard };
