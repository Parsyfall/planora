import * as repo from './search.repository.js';

export const searchEvents = async (query) => {
  return repo.searchPublicEvents({
    term: query.term ? String(query.term).trim() : '',
    location: query.location ? String(query.location).trim() : '',
    eventDate: query.eventDate ? String(query.eventDate).trim() : ''
  });
};
