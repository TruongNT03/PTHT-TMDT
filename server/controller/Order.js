import db from "../models";

const insertOrder = async (req, res) => {
  const user = req.user;
  const { card_item_ids } = req.body;
  const transaction = await db.sequelize.transaction();
  // Tao order
  let total_price = 0;
  const order = await db.orders.create(
    {
      user_id: user.id,
      total_price: 0,
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

  return res.status(201).json({
    message: "Thành công",
    data: order,
  });
};

const getAllOrder = async (req, res) => {
  const user = req.user;
  const orderList = await db.orders.findAll({
    where: {
      user_id: user.id,
    },
    attributes: ["id", "total_price", "status"],
  });
  return res.status(200).json({ message: "Thành công", data: orderList });
};

export { insertOrder, getAllOrder };
