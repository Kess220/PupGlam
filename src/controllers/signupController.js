import bcrypt from "bcrypt";
import { db } from "../config/dbConfig.js";

import { UserSchema } from "../schemas/auth.schema.js";

// Função para cadastrar um novo usuário
export const signup = async (req, res) => {
  try {
    const { nome, email, senha, confirmarSenha, cpf, telefone } = req.body;

    // Validar os dados do usuário
    const validation = UserSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((err) => err.message);
      return res.status(400).json({ message: "Erro de validação", errors });
    }

    // Verificar se o usuário já existe
    const existingUser = await db.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email já está sendo usado" });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    // Inserir o novo usuário na tabela de usuários
    const query =
      "INSERT INTO usuarios (nome, email, senha, cpf, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [nome, email, hashedPassword, cpf, telefone];
    const newUser = await db.query(query, values);

    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser.rows[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar usuário", error: error.message });
  }
};
