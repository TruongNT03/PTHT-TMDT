import Joi from "joi";

const AddressSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  isDefault: Joi.boolean().default(false),
});

export default AddressSchema;
