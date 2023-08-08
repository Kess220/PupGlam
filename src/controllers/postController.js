import { db } from "../config/dbConfig.js";

export const createPost = async (req, res) => {
  try {
    const { imagem_url, descricao, id_cachorro } = req.body;

    // Obtém a data e hora atual
    const data_hora = new Date();

    // Insere a nova postagem na tabela de postagens
    const query =
      "INSERT INTO postagens (imagem_url, descricao, data_hora, id_cachorro) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [imagem_url, descricao, data_hora, id_cachorro];
    const newPostagem = await db.query(query, values);

    return res
      .status(201)
      .json({
        message: "Postagem criada com sucesso",
        postagem: newPostagem.rows[0],
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar postagem", error: error.message });
  }
};
