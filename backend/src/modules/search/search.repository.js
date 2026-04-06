import { query } from '../../config/db.js';

export const searchPublicEvents = async ({ term, location, eventDate }) => {
  const filters = ['e.is_public = 1'];
  const params = {};

  if (term) {
    filters.push('(e.title LIKE :term OR e.description LIKE :term)');
    params.term = `%${term}%`;
  }

  if (location) {
    filters.push('e.location LIKE :location');
    params.location = `%${location}%`;
  }

  if (eventDate) {
    filters.push('e.event_date = :eventDate');
    params.eventDate = eventDate;
  }

  const whereClause = filters.join(' AND ');

  return query(
    `SELECT e.*, u.first_name, u.last_name
     FROM events e
     JOIN users u ON u.id = e.organizer_id
     WHERE ${whereClause}
     ORDER BY e.event_date ASC, e.event_time ASC`,
    params
  );
};
