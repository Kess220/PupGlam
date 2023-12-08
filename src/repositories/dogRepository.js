import { db } from "../config/dbConfig.js";

export async function createDog(dog, userId) {
  const query =
    "INSERT INTO dogs (name, breed, age, description, hireable, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  const values = [
    dog.name,
    dog.breed,
    dog.age,
    dog.description,
    dog.hireable,
    userId,
  ];
  const dogCreated = await db.query(query, values);
  return dogCreated.rows[0];
}

export async function getAllDogsByUser(userId) {
  const query =
    "SELECT dogs.*, users.name AS name_tutor, users.phone, users.email FROM dogs LEFT JOIN users ON dogs.user_id = users.id WHERE dogs.user_id = $1";
  const dogs = await db.query(query, [userId]);
  return dogs.rows;
}

export async function getDogById(dogId) {
  const query =
    "SELECT dogs.*, users.name AS name_tutor, users.phone, users.email FROM dogs LEFT JOIN users ON dogs.user_id = users.id WHERE dogs.id = $1";
  const dog = await db.query(query, [dogId]);
  return dog.rows.length === 0 ? null : dog.rows[0];
}

export async function updateDogStatus(dogId, newStatus) {
  const query = "UPDATE dogs SET hireable = $1 WHERE id = $2";
  await db.query(query, [newStatus, dogId]);
}
