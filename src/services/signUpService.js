import bcrypt from "bcrypt";
import { UserSchema } from "../schemas/auth.schema.js";
import { UserExistsError } from "../errors/UserExistsError.js";
import * as signUpRepository from "../repositories/signupRepository.js";

export async function validateUserData(userData) {
  const validation = UserSchema.validate(userData, { abortEarly: false });
  if (validation.error) {
    const errors = validation.error.details.map((err) => err.message);
    throw new UserExistsError(errors.join(", "));
  }
}

export async function checkExistingUser(email) {
  const existingUser = await signUpRepository.findUserByEmail(email);
  if (existingUser.length > 0) {
    throw new UserExistsError();
  }
}

export async function signupUser(userData) {
  await validateUserData(userData);
  await checkExistingUser(userData.email);

  const { name, email, password, cpf, phone } = userData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await signUpRepository.createUser({
    name,
    email,
    password: hashedPassword,
    cpf,
    phone,
  });

  return newUser;
}
