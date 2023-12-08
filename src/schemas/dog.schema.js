import Joi from "joi";
import { InvalidHireableError } from "../errors/index.js";

export const dogSchema = Joi.object({
  name: Joi.string().required(),
  breed: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  description: Joi.string().required(),
  hireable: Joi.boolean()
    .required()
    .error(() => new InvalidHireableError()),
});
