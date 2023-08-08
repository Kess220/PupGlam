import { db } from "../config/dbConfig.js";

export const cadastrarDogs = async (req, res) => {
  try {
    const { nome, raca, idade, descricao } = req.body;

    const userId = req.user.userId;

    const query =
      "INSERT INTO cachorros (nome, raca, idade, descricao, id_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [nome, raca, idade, descricao, userId];
    const novoCachorro = await db.query(query, values);

    console.log("ID do usuário:", userId);

    return res.status(201).json({
      message: "Cachorro cadastrado com sucesso",
      cachorro: novoCachorro.rows[0],
    });
  } catch (error) {
    console.log("Erro ao cadastrar cachorro. ID do usuário:", req.user.userId);
    return res
      .status(500)
      .json({ message: "Erro ao cadastrar cachorro", error: error.message });
  }
};
