import db from "../models";
import PayOS from "@payos/node";
import dotenv from "dotenv";
import { cast, col, Op, or, where } from "sequelize";

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
    if (product_variant.stock >= quantity) {
      await db.order_details.create(
        {
          order_id: order.id,
          product_variant_id: product_variant.id,
          quantity: quantity,
          price: product_variant.price,
        },
        { transaction }
      );
      total_price += product_variant.price * quantity;
    }
    product_variant.stock -= quantity;
    await product_variant.save({ transaction });
    const product = await db.products.findByPk(product_variant.product_id);
    product.stock -= quantity;
    await product.save({ transaction });
  }
  // Cap nhap total_price cho order
  order.total_price = total_price;
  await order.save({ transaction });

  if (method === "COD") {
    await transaction.commit();
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
    res.status(201).json({
      message: "Tạo liên kết thanh toán thành công",
      checkoutUrl: paymentLink.checkoutUrl,
    });

    let isChecking = false;

    const interval = setInterval(() => {
      if (isChecking) return;
      isChecking = true;

      (async () => {
        try {
          const orderInfo = await payos.getPaymentLinkInformation(order.id);
          console.log("Trạng thái đơn hàng:", orderInfo.status);

          if (orderInfo.status === "PAID") {
            await order.update({ payment: true }, { transaction });
            await transaction.commit();
            console.log("Đơn hàng đã thanh toán. Dừng kiểm tra.");
            clearInterval(interval);
          } else if (orderInfo.status === "CANCELLED") {
            await transaction.rollback();
            console.log("Đơn hàng bị huỷ. Dừng kiểm tra.");
            clearInterval(interval);
          } else {
            console.log("Chưa thanh toán hoặc đang chờ.");
          }
        } catch (err) {
          console.error("Lỗi khi kiểm tra đơn hàng:", err);
          await transaction.rollback(); // nếu cần
          clearInterval(interval);
        } finally {
          isChecking = false;
        }
      })();
    }, 2000);

    // Thêm giới hạn 5 phút tự dừng
    setTimeout(() => {
      console.log("Quá thời gian kiểm tra. Dừng lại.");
      clearInterval(interval);
    }, 300000);
  }
};

const getAllOrder = async (req, res) => {
  const user = req.user;
  const orderList = await db.orders.findAll({
    where: {
      user_id: user.id,
    },
    attributes: ["id", "total_price", "status", "payment", "createdAt"],
    include: [
      {
        model: db.address,
        attributes: ["id", "name", "phone", "address"],
      },
    ],
  });
  return res.status(200).json({ message: "Thành công", data: orderList });
};

const adminGetAllOrder = async (req, res) => {
  const { keyword = "" } = req.query;
  const keywordCondition =
    keyword !== ""
      ? {
          [Op.or]: [
            where(cast(db.Sequelize.col("orders.id"), "CHAR"), {
              [Op.like]: `%${keyword}%`,
            }),
            where(cast(col("orders.total_price"), "CHAR"), {
              [Op.like]: `%${keyword}%`,
            }),
            where(col("address.name"), {
              [Op.like]: `%${keyword}%`,
            }),
            where(col("address.address"), {
              [Op.like]: `%${keyword}%`,
            }),
          ],
        }
      : {};
  const orderList = await db.orders.findAll({
    where: keywordCondition,
    attributes: ["id", "total_price", "status", "payment", "createdAt"],
    include: [
      {
        model: db.address,
        attributes: ["id", "name", "phone", "address"],
      },
    ],
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

export { insertOrder, getAllOrder, updateOrder, adminGetAllOrder };
