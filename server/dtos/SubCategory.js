import Joi from "joi";

const insert = Joi.object({
  name: Joi.string().required(),
  categoryName: Joi.string().required(),
});

const update = Joi.object({
  id: Joi.required(),
  name: Joi.string().optional(),
  categoryName: Joi.string().optional(),
});

const del = Joi.object({
  id: Joi.required(),
});

export { insert, update, del };
