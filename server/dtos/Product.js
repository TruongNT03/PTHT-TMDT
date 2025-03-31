import Joi from "joi";

const insert = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  category_id: Joi.number().required(),
  section_id: Joi.number().required(),
  product_images: Joi.array().optional(),
  variants: Joi.array().required(),
});

const update = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  category_id: Joi.optional(),
  section_id: Joi.optional(),
});

const del = Joi.object({
  id: Joi.number().required(),
});

export { insert, update, del };
