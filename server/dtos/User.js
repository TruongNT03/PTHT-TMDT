import Joi from "joi";

const UserSchema = Joi.object({
  password: Joi.string().min(6).max(50).required(),
  firstname: Joi.string().optional().allow(""),
  lastname: Joi.string().optional().allow(""),
  email: Joi.string().email().required(),
  avatar: Joi.string().uri().optional().allow(""),
});
// class UserSchema extends Joi.object{
//   constructor(user){

//   }
//   static validate()
//   username: Joi.string().min(3).max(30).required(),
//   password: Joi.string().min(6).max(50).required(),
//   fullname: Joi.string().optional().allow(""),
//   email: Joi.string().email().required(),
//   role: Joi.string().valid("user", "admin").default("user"),
//   avatar: Joi.string().uri().optional().allow(""),
// }

export default UserSchema;
