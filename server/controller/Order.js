import db from "../models";
import PayOS from "@payos/node";
import dotenv from "dotenv";

dotenv.config();

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

dotenv.config();

const insertOrder = async (req, res) => {
  const user = req.user;
  const { card_item_ids, method, address_id } = req.body;
  console.log(method);
  const transaction = await db.sequelize.transaction();
  // Tao order
  let total_price = 0;
  const order = await db.orders.create(
    {
      user_id: user.id,
      total_price: 0,
      address_id: address_id,
      status: "Ordered",
    },
    { transaction }
  );
  // Tao cac order dertails
  for (const card_item_id of card_item_ids) {
    const { product_variant_id, quantity } = await db.cart_items.findByPk(
      card_item_id
    );
    const product_variant = await db.product_variant_values.findByPk(
      product_variant_id
    );
    product_variant.stock -= quantity;
    await product_variant.save({ transaction });
    const product = await db.products.findByPk(product_variant.product_id);
    product.stock -= quantity;
    await product.save({ transaction });
    if (product_variant.stock >= quantity) {
      await db.order_details.create(
        {
          order_id: order.id,
          product_variant_id: product_variant.id,
          quantity: quantity,
        },
        { transaction }
      );
      total_price += product_variant.price * quantity;
    }
  }
  // Cap nhap total_price cho order
  order.total_price = total_price;
  await order.save({ transaction });

  await transaction.commit();

  if (method === "COD") {
    return res.status(201).json({
      message: "Thành công",
      data: order,
    });
  }
  if (method === "QR") {
    const orderPay = {
      amount: 2000,
      description: `Thanh toán đơn hàng #${order.id}`,
      orderCode: order.id,
      cancelUrl: "http://localhost:3000",
      returnUrl: "http://localhost:3000",
    };
    const paymentLink = await payos.createPaymentLink(orderPay);
    return res.status(201).json({
      message: "Tạo liên kết thanh toán thành công",
      checkoutUrl: paymentLink.checkoutUrl,
    });
  }
};

const getAllOrder = async (req, res) => {
  const user = req.user;
  const orderList = await db.orders.findAll({
    where: {
      user_id: user.id,
    },
    attributes: ["id", "total_price", "status", "payment", "createdAt"],
  });
  return res.status(200).json({ message: "Thành công", data: orderList });
};

const updateOrder = async (req, res) => {
  const { id, status, payment } = req.body;
  const order = await db.orders.findByPk(id);
  await order.update({
    status,
    payment,
  });
  return res.status(200).json({ message: "Thành công" });
};

export { insertOrder, getAllOrder, updateOrder };
