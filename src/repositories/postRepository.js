import { db } from "../config/dbConfig.js";

export const createPost = async (image_url, description, dog_id) => {
  const created_at = new Date();

  const query =
    "INSERT INTO posts (image_url, description, created_at, dog_id) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [image_url, description, created_at, dog_id];
  return await db.query(query, values);
};

export const getAllPosts = async () => {
  const query = `
    SELECT 
      p.*, 
      c.name AS dog_name, 
      c.age AS dog_age,
      c.hireable AS dog_hireable
    FROM posts p
    INNER JOIN dogs c ON p.dog_id = c.id`;

  return await db.query(query);
};

export const getPostById = async (postId) => {
  const query = "SELECT * FROM posts WHERE id = $1";
  return await db.query(query, [postId]);
};

export const addLike = async (postId, userId) => {
  const query =
    "INSERT INTO likes (post_id, user_id, created_at) VALUES ($1, $2, NOW())";
  return await db.query(query, [postId, userId]);
};

export const removeLike = async (postId, userId) => {
  const query = "DELETE FROM likes WHERE post_id = $1 AND user_id = $2";
  return await db.query(query, [postId, userId]);
};

export const getLikesCount = async (postId) => {
  const query = `
    SELECT 
      user_id
    FROM likes 
    WHERE post_id = $1`;

  const result = await db.query(query, [postId]);

  const usersWhoLiked = result.rows
    ? result.rows.map((row) => row.user_id)
    : [];

  return {
    likesCount: usersWhoLiked.length,
    usersWhoLiked,
  };
};

export const addCommentToPost = async (text, postId, userId) => {
  const query =
    "INSERT INTO comments (text, created_at, post_id, user_id) VALUES ($1, NOW(), $2, $3) RETURNING *";
  const values = [text, postId, userId];
  return await db.query(query, values);
};

export const getCommentsByPostId = async (postId) => {
  const query = "SELECT * FROM comments WHERE post_id = $1";
  return await db.query(query, [postId]);
};
