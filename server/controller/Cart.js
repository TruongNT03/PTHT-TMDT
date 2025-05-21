import db from "../models/index.js";

const insertItem = async (req, res) => {
  const user = req.user;
  const { product_variant_id, quantity } = req.body;
  let cart = await db.carts.findOne({
    where: {
      user_id: user.id,
    },
  });
  if (!cart) {
    cart = await db.carts.create({
      user_id: user.id,
    });
  }
  let cartItem = await db.cart_items.findOne({
    where: {
      product_variant_id: product_variant_id,
      cart_id: cart.id,
    },
    attributes: ["id", "product_variant_id", "cart_id", "quantity"],
  });
  if (!cartItem) {
    cartItem = await db.cart_items.create({
      product_variant_id: product_variant_id,
      cart_id: cart.id,
      quantity: quantity,
    });
  } else {
    cartItem.quantity += quantity;
    await cartItem.save();
  }
  return res.status(200).json({ message: "Thành công", data: cartItem });
};

const getCart = async (req, res) => {
  const user = req.user;
  let cart = await db.carts.findOne({
    where: {
      user_id: user.id,
    },
    attributes: ["id", "user_id"],
  });
  if (!cart) {
    cart = await db.carts.create({
      user_id: user.id,
    });
  }
  const cart_items = await db.cart_items.findAll({
    where: {
      cart_id: cart.id,
    },
    attributes: ["id", "product_variant_id", "quantity"],
    include: [
      {
        model: db.product_variant_values,
        attributes: [
          "id",
          "product_id",
          "price",
          "old_price",
          "image",
          "stock",
          "sku",
        ],
        include: {
          model: db.products,
          attributes: ["id", "name"],
          include: {
            model: db.product_images,
            attributes: ["path"],
          },
        },
      },
    ],
  });
  // let res_cart = [];
  // for (const cart_item of cart_items) {
  //   res_cart.push({
  //     cart_item: {
  //       id: cart_item.id,
  //       product_variant_id: cart_item.product_variant_id,
  //       quantity: cart_item.quantity,
  //       product_variant_value: {
  //         id: cart_item.product_variant_value.id,
  //         product_id: cart_item.product_variant_value.product_id,
  //         price: cart_item.product_variant_value.price,
  //         old_price: cart_item.product_variant_value.old_price,
  //         stock: cart_item.product_variant_value.stock,
  //         sku: cart_item.product_variant_value.sku,
  //         image: cart_item.product_variant_value.image,
  //       },
  //     },
  //   });
  // }
  // for (const cart_item of res_cart) {
  //   const product_id = cart_item.cart_item.product_variant_value.product_id;
  //   const product_variant_values = await db.product_variant_values.findAll({
  //     where: {
  //       product_id,
  //     },
  //     attributes: [
  //       "id",
  //       "product_id",
  //       "price",
  //       "old_price",
  //       "stock",
  //       "image",
  //       "sku",
  //     ],
  //     include: [
  //       {
  //         model: db.products,
  //         attributes: ["name"],
  //       },
  //     ],
  //   });
  //   cart_item.product_variant = product_variant_values;
  //   for (const item of res_cart) {
  //     item.cart_item.product_variant_value.variant_value = [];
  //     const variant_value_ids = item.cart_item.product_variant_value.sku

  //       .split("-")
  //       .map((value) => Number.parseInt(value));
  //     for (const variant_value_id of variant_value_ids) {
  //       const variant_values = await db.variant_values.findByPk(
  //         variant_value_id,
  //         {
  //           include: [
  //             {
  //               model: db.variants,
  //               attributes: ["name"],
  //             },
  //           ],
  //         }
  //       );
  //       item.cart_item.product_variant_value.variant_value.push({
  //         name: variant_values.variant.name,
  //         value: variant_values.name,
  //       });
  //     }
  //   }
  // }
  const resData = [];
  for (const value of cart_items) {
    let variant = [];
    if (value.product_variant_value.sku !== "") {
      const variant_value_id = value.product_variant_value.sku
        .split("-")
        .map((value) => Number.parseInt(value));
      for (const value of variant_value_id) {
        const variant_value = await db.variant_values.findByPk(value, {
          include: [
            {
              model: db.variants,
              attributes: ["name"],
            },
          ],
        });

        variant.push({
          name: variant_value.variant.name,
          value: variant_value.name,
        });
      }
    }
    const product_id = value.product_variant_value.product.id;
    const product_images = await db.product_images.findAll({
      where: {
        product_id: product_id,
      },
    });
    resData.push({
      id: value.id,
      name: value.product_variant_value.product.name,
      product_id: value.product_variant_value.product_id,
      price: value.product_variant_value.price,
      old_price: value.product_variant_value.old_price,
      image: value.product_variant_value.image,
      quantity: value.quantity,
      stock: value.product_variant_value.stock,
      variant: variant,
    });
  }
  return res.status(200).json({
    message: "Thành công",
    data: resData,
    total_item: resData.length,
  });
  // return res.status(200).json({
  //   message: "Thành công",
  //   data: res_cart,
  // });
};

const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  await db.cart_items.destroy({
    where: {
      id,
    },
  });
  return res.status(200).json({ message: "Xóa thành công" });
};

const updateCart = async (req, res) => {
  const { id, quantity } = req.body;
  const cart_item = await db.cart_items.findByPk(id);
  cart_item.quantity = quantity;
  await cart_item.save();
  return res.status(200).json({ message: "Thành công" });
};

export { insertItem, getCart, deleteCartItem, updateCart };
