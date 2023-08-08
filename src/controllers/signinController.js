import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/dbConfig.js";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    const existingUser = await db.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length === 0) {
      console.log("Usuário não encontrado");
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const user = existingUser.rows[0];

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      console.log("Senha inválida");
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Login bem-sucedido");
    return res.status(200).json({ message: "Login bem-sucedido", token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res
      .status(500)
      .json({ message: "Erro ao fazer login", error: error.message });
  }
};
