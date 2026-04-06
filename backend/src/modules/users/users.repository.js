import { query } from '../../config/db.js';

export const findById = async (id) => {
  const rows = await query(
    `SELECT id, first_name, last_name, email, phone, role, created_at
     FROM users WHERE id = :id LIMIT 1`,
    { id }
  );
  return rows[0] || null;
};

export const updateById = async (id, payload) => {
  await query(
    `UPDATE users
     SET first_name = COALESCE(:firstName, first_name),
         last_name = COALESCE(:lastName, last_name),
         phone = COALESCE(:phone, phone)
     WHERE id = :id`,
    {
      id,
      firstName: payload.firstName ?? null,
      lastName: payload.lastName ?? null,
      phone: payload.phone ?? null
    }
  );

  return findById(id);
};

export const setRole = async (id, role) => {
  await query('UPDATE users SET role = :role WHERE id = :id', { id, role });
  return findById(id);
};
