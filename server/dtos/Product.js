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

export { insert };
