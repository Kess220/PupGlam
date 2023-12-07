import Joi from "joi";

export const UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  cpf: Joi.string().length(11).required(),
  phone: Joi.string().required(),
});
