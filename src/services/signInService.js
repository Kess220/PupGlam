import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../repositories/signinRepository.js";
import dotenv from "dotenv";
import { EmailOrPasswordInvalidError } from "../errors/index.js";

dotenv.config();

export async function loginUser(email, password) {
  const existingUser = await findUserByEmail(email);

  if (existingUser.length === 0) {
    throw new EmailOrPasswordInvalidError();
  }

  const user = existingUser[0];

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new EmailOrPasswordInvalidError();
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { message: "Login bem-sucedido", token };
}
