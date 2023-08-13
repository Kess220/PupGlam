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

export const listarCachorrosPorUsuario = async (req, res) => {
  try {
    const userId = req.user.userId;

    const query =
      "SELECT cachorros.*, usuarios.nome AS nome_tutor, usuarios.telefone, usuarios.email FROM cachorros LEFT JOIN usuarios ON cachorros.id_usuario = usuarios.id WHERE cachorros.id_usuario = $1";
    const cachorros = await db.query(query, [userId]);

    return res.status(200).json({ cachorros: cachorros.rows });
  } catch (error) {
    console.log(
      "Erro ao listar cachorros do usuário. ID do usuário:",
      req.user.userId
    );
    return res.status(500).json({
      message: "Erro ao listar cachorros do usuário",
      error: error.message,
    });
  }
};

export const toggleContratacao = async (req, res) => {
  try {
    const { cachorroId } = req.params;

    // Primeiro, obter o status atual de contratação do cachorro
    const getCachorroQuery =
      "SELECT ativo_contratacao FROM cachorros WHERE id = $1";
    const getCachorroResult = await db.query(getCachorroQuery, [cachorroId]);

    if (getCachorroResult.rows.length === 0) {
      return res.status(404).json({ message: "Cachorro não encontrado" });
    }

    const novoStatus = !getCachorroResult.rows[0].ativo_contratacao;

    // Atualizar o status de contratação do cachorro
    const updateQuery =
      "UPDATE cachorros SET ativo_contratacao = $1 WHERE id = $2";
    await db.query(updateQuery, [novoStatus, cachorroId]);

    return res
      .status(200)
      .json({ message: "Status de contratação atualizado" });
  } catch (error) {
    console.log("Erro ao atualizar status de contratação:", error);
    return res.status(500).json({
      message: "Erro ao atualizar status de contratação",
      error: error.message,
    });
  }
};

export const obterCachorroPorId = async (req, res) => {
  try {
    const { cachorroId } = req.params;

    const query =
      "SELECT cachorros.*, usuarios.nome AS nome_tutor, usuarios.telefone, usuarios.email FROM cachorros LEFT JOIN usuarios ON cachorros.id_usuario = usuarios.id WHERE cachorros.id = $1";
    const cachorro = await db.query(query, [cachorroId]);

    if (cachorro.rows.length === 0) {
      return res.status(404).json({ message: "Cachorro não encontrado" });
    }

    return res.status(200).json({ cachorro: cachorro.rows[0] });
  } catch (error) {
    console.log("Erro ao obter informações do cachorro:", error);
    return res.status(500).json({
      message: "Erro ao obter informações do cachorro",
      error: error.message,
    });
  }
};

