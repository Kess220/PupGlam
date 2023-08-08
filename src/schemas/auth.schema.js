import Joi from "joi";

export const UserSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
  confirmarSenha: Joi.string().valid(Joi.ref("senha")).required(),
  cpf: Joi.string().length(11).required(),
  telefone: Joi.string().required(),
});
