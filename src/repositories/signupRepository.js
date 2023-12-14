import { db } from "../config/dbConfig.js";

export async function findUserByEmail(email) {
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await db.query(query, [email]);
  return result.rows;
}

export async function createUser(user) {
  const {
    name, email, password, cpf, phone,
  } = user;
  const query = "INSERT INTO users (name, email, password, cpf, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [name, email, password, cpf, phone];
  const result = await db.query(query, values);
  return result.rows[0];
}
