import { query } from '../../config/db.js';

export const listVendors = async ({ category, location }) => {
  const filters = ['1=1'];
  const params = {};

  if (category) {
    filters.push('category LIKE :category');
    params.category = `%${category}%`;
  }

  if (location) {
    filters.push('location LIKE :location');
    params.location = `%${location}%`;
  }

  return query(
    `SELECT * FROM vendors
     WHERE ${filters.join(' AND ')}
     ORDER BY category ASC, name ASC`,
    params
  );
};

export const findById = async (id) => {
  const rows = await query('SELECT * FROM vendors WHERE id = :id LIMIT 1', { id });
  return rows[0] || null;
};

export const createVendor = async ({ name, category, location, email, phone }) => {
  const result = await query(
    `INSERT INTO vendors (name, category, location, email, phone)
     VALUES (:name, :category, :location, :email, :phone)`,
    { name, category, location, email, phone }
  );
  return findById(result.insertId);
};

export const updateVendor = async (id, payload) => {
  await query(
    `UPDATE vendors
     SET name = COALESCE(:name, name),
         category = COALESCE(:category, category),
         location = COALESCE(:location, location),
         email = COALESCE(:email, email),
         phone = COALESCE(:phone, phone)
     WHERE id = :id`,
    {
      id,
      name: payload.name ?? null,
      category: payload.category ?? null,
      location: payload.location ?? null,
      email: payload.email ?? null,
      phone: payload.phone ?? null
    }
  );
  return findById(id);
};

export const deleteVendor = async (id) => query('DELETE FROM vendors WHERE id = :id', { id });
