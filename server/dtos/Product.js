import Joi from "joi";

const insert = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().required().min(0),
  stock: Joi.number().required().min(0),
  image: Joi.string().optional(),
  subCategoryId: Joi.number().required(),
  sectionId: Joi.number().required(),
});

const update = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().min(0).optional(),
  stock: Joi.number().min(0).optional(),
  image: Joi.string().optional(),
  subCategoryId: Joi.number().optional(),
  sectionId: Joi.number().optional(),
});

const del = Joi.object({
  id: Joi.number().required(),
});

export { insert, update, del };
