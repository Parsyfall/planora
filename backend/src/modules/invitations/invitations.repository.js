import { query } from '../../config/db.js';

export const createInvitation = async ({ eventId, email, status }) => {
  const result = await query(
    `INSERT INTO invitations (event_id, guest_email, status)
     VALUES (:eventId, :email, :status)`,
    { eventId, email, status }
  );
  return findById(result.insertId);
};

export const findById = async (id) => {
  const rows = await query(
    `SELECT i.*, e.title AS event_title, e.location, e.event_date, e.event_time, e.organizer_id
     FROM invitations i
     JOIN events e ON e.id = i.event_id
     WHERE i.id = :id
     LIMIT 1`,
    { id }
  );
  return rows[0] || null;
};

export const findByEventAndEmail = async (eventId, email) => {
  const rows = await query(
    `SELECT * FROM invitations WHERE event_id = :eventId AND guest_email = :email LIMIT 1`,
    { eventId, email }
  );
  return rows[0] || null;
};

export const listForEmail = async (email) => {
  return query(
    `SELECT i.*, e.title AS event_title, e.description, e.location, e.event_date, e.event_time,
            u.first_name, u.last_name, u.email AS organizer_email
     FROM invitations i
     JOIN events e ON e.id = i.event_id
     JOIN users u ON u.id = e.organizer_id
     WHERE i.guest_email = :email
     ORDER BY e.event_date ASC, e.event_time ASC`,
    { email }
  );
};

export const listByEventId = async (eventId) => {
  return query(
    `SELECT * FROM invitations WHERE event_id = :eventId ORDER BY sent_at DESC`,
    { eventId }
  );
};

export const updateStatus = async (id, status) => {
  await query(
    `UPDATE invitations
     SET status = :status,
         responded_at = NOW()
     WHERE id = :id`,
    { id, status }
  );
  return findById(id);
};
