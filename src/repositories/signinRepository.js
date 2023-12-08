import { db } from "../config/dbConfig.js";

export async function findUserByEmail(email) {
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await db.query(query, [email]);
  return result.rows;
}
