import Joi from "joi";

const insert = Joi.object({
  name: Joi.string().required(),
});

const update = Joi.object({
  id: Joi.required(),
  name: Joi.string().required(),
});

const del = Joi.object({
  id: Joi.required(),
});

export { insert, update, del };
