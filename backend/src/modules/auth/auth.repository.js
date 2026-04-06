import { query } from '../../config/db.js';

export const findByEmail = async (email) => {
  const rows = await query(
    `SELECT id, email, password_hash, role, first_name, last_name, phone, created_at
     FROM users
     WHERE email = :email
     LIMIT 1`,
    { email }
  );
  return rows[0] || null;
};

export const findById = async (id) => {
  const rows = await query(
    `SELECT id, email, role, first_name, last_name, phone, created_at
     FROM users
     WHERE id = :id
     LIMIT 1`,
    { id }
  );
  return rows[0] || null;
};

export const createUser = async ({ firstName, lastName, email, phone, passwordHash, role }) => {
  const result = await query(
    `INSERT INTO users (first_name, last_name, email, phone, password_hash, role)
     VALUES (:firstName, :lastName, :email, :phone, :passwordHash, :role)`,
    { firstName, lastName, email, phone, passwordHash, role }
  );
  return findById(result.insertId);
};
