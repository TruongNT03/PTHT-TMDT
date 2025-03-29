import Joi from "joi";

const AddressSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  is_default: Joi.boolean().default(false),
});

export default AddressSchema;
