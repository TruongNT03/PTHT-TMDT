import Joi from "joi";

const insert = Joi.object({
  product_id: Joi.number().required(),
  price: Joi.number().required(),
  old_price: Joi.number().required(),
  stock: Joi.number().required(),
  sku: Joi.number().required(),
});

export { insert };
