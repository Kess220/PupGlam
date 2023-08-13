import { db } from "../config/dbConfig.js";

export const createPost = async (req, res) => {
  try {
    const { imagem_url, descricao, id_cachorro } = req.body;

    const data_hora = new Date();

    const query =
      "INSERT INTO postagens (imagem_url, descricao, data_hora, id_cachorro) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [imagem_url, descricao, data_hora, id_cachorro];
    const newPostagem = await db.query(query, values);

    return res.status(201).json({
      message: "Postagem criada com sucesso",
      postagem: newPostagem.rows[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar postagem", error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.*, 
        c.nome AS nome_cachorro, 
        c.idade AS idade_cachorro,
        c.ativo_contratacao AS cachorro_disponivel_contratacao
      FROM postagens p
      INNER JOIN cachorros c ON p.id_cachorro = c.id`;

    const posts = await db.query(query);

    return res.status(200).json({ posts: posts.rows });
  } catch (error) {
    console.error("Erro ao obter postagens:", error);
    return res
      .status(500)
      .json({ message: "Erro ao obter postagens", error: error.message });
  }
};

export const curtirPostagem = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;

    const existingPost = await db.query(
      "SELECT * FROM postagens WHERE id = $1",
      [postId]
    );
    if (existingPost.rows.length === 0) {
      return res.status(404).json({ message: "Postagem não encontrada" });
    }

    const existingLike = await db.query(
      "SELECT * FROM curtidas WHERE id_postagem = $1 AND id_usuario = $2",
      [postId, userId]
    );
    if (existingLike.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Usuário já curtiu esta postagem" });
    }

    const query =
      "INSERT INTO curtidas (id_postagem, id_usuario, data_hora) VALUES ($1, $2, NOW())";
    await db.query(query, [postId, userId]);

    return res.status(201).json({ message: "Postagem curtida com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao curtir postagem", error: error.message });
  }
};

export const descurtirPostagem = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;

    const existingLike = await db.query(
      "SELECT * FROM curtidas WHERE id_postagem = $1 AND id_usuario = $2",
      [postId, userId]
    );
    if (existingLike.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Usuário não curtiu esta postagem" });
    }

    const query =
      "DELETE FROM curtidas WHERE id_postagem = $1 AND id_usuario = $2";
    await db.query(query, [postId, userId]);

    return res.status(200).json({ message: "Postagem descurtida com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao descurtir postagem", error: error.message });
  }
};

export const getLikesCount = async (req, res) => {
  try {
    const postId = req.params.id;

    const result = await db.query(
      "SELECT COUNT(*) AS likes_count, array_agg(id_usuario) AS usuarios_que_curtiram FROM curtidas WHERE id_postagem = $1",
      [postId]
    );

    const likesCount = result.rows[0].likes_count;
    const usuariosQueCurtiram = result.rows[0].usuarios_que_curtiram || [];

    return res.status(200).json({ likesCount, usuariosQueCurtiram });
  } catch (error) {
    console.error("Erro ao obter número de curtidas:", error);
    return res.status(500).json({ error: "Erro ao obter número de curtidas" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { texto } = req.body;
    const postId = req.params.id;
    const userId = req.user.userId; // ID do usuário autenticado

    // Insere o novo comentário na tabela de comentários
    const query =
      "INSERT INTO comentarios (texto, data_hora, id_postagem, id_usuario) VALUES ($1, NOW(), $2, $3) RETURNING *";
    const values = [texto, postId, userId];
    const novoComentario = await db.query(query, values);

    return res.status(201).json({
      message: "Comentário adicionado com sucesso",
      comentario: novoComentario.rows[0],
    });
  } catch (error) {
    console.error("Erro ao adicionar comentário:", error);
    return res
      .status(500)
      .json({ message: "Erro ao adicionar comentário", error: error.message });
  }
};

export const getCommentsByPostId = async (req, res) => {
  const postId = req.params.id;

  try {
    const comments = await db.query(
      "SELECT * FROM comentarios WHERE id_postagem = $1",
      [postId]
    );

    const formattedComments = comments.rows.map((comment) => ({
      id: comment.id,
      texto: comment.texto,
      data_hora: comment.data_hora,
    }));

    return res.status(200).json({ comments: formattedComments });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar comentários da postagem",
      error: error.message,
    });
  }
};
