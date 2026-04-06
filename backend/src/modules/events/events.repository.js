import { query } from '../../config/db.js';

export const createEvent = async ({ organizerId, title, description, location, eventDate, eventTime, isPublic, invitationMediaUrl }) => {
  const result = await query(
    `INSERT INTO events (organizer_id, title, description, location, event_date, event_time, is_public, invitation_media_url)
     VALUES (:organizerId, :title, :description, :location, :eventDate, :eventTime, :isPublic, :invitationMediaUrl)`,
    { organizerId, title, description, location, eventDate, eventTime, isPublic, invitationMediaUrl }
  );
  return findById(result.insertId);
};

export const findById = async (id) => {
  const rows = await query(
    `SELECT e.*, u.first_name, u.last_name, u.email AS organizer_email
     FROM events e
     JOIN users u ON u.id = e.organizer_id
     WHERE e.id = :id
     LIMIT 1`,
    { id }
  );
  return rows[0] || null;
};

export const listMine = async (organizerId) => {
  return query(
    `SELECT *
     FROM events
     WHERE organizer_id = :organizerId
     ORDER BY event_date ASC, event_time ASC`,
    { organizerId }
  );
};

export const listPublic = async () => {
  return query(
    `SELECT e.*, u.first_name, u.last_name
     FROM events e
     JOIN users u ON u.id = e.organizer_id
     WHERE e.is_public = 1
     ORDER BY e.event_date ASC, e.event_time ASC`
  );
};

export const updateEvent = async (id, payload) => {
  await query(
    `UPDATE events
     SET title = COALESCE(:title, title),
         description = COALESCE(:description, description),
         location = COALESCE(:location, location),
         event_date = COALESCE(:eventDate, event_date),
         event_time = COALESCE(:eventTime, event_time),
         is_public = COALESCE(:isPublic, is_public),
         invitation_media_url = COALESCE(:invitationMediaUrl, invitation_media_url)
     WHERE id = :id`,
    {
      id,
      title: payload.title ?? null,
      description: payload.description ?? null,
      location: payload.location ?? null,
      eventDate: payload.eventDate ?? null,
      eventTime: payload.eventTime ?? null,
      isPublic: payload.isPublic ?? null,
      invitationMediaUrl: payload.invitationMediaUrl ?? null
    }
  );
  return findById(id);
};

export const deleteEvent = async (id) => {
  return query('DELETE FROM events WHERE id = :id', { id });
};
