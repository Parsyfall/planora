import { AppError } from '../../common/errors/AppError.js';
import { requireFields } from '../../common/utils/validators.js';
import * as repo from './events.repository.js';

const assertOwnership = (event, userId) => {
  if (!event) {
    throw new AppError('Event not found', 404);
  }
  if (Number(event.organizer_id) !== Number(userId)) {
    throw new AppError('You do not own this event', 403);
  }
};

export const createEvent = async (userId, payload) => {
  requireFields(payload, ['title', 'location', 'eventDate', 'eventTime']);

  return repo.createEvent({
    organizerId: userId,
    title: String(payload.title).trim(),
    description: payload.description ? String(payload.description).trim() : null,
    location: String(payload.location).trim(),
    eventDate: payload.eventDate,
    eventTime: payload.eventTime,
    isPublic: payload.isPublic ? 1 : 0,
    invitationMediaUrl: payload.invitationMediaUrl ? String(payload.invitationMediaUrl).trim() : null
  });
};

export const listMine = async (userId) => repo.listMine(userId);
export const listPublic = async () => repo.listPublic();

export const getById = async (eventId, currentUser = null) => {
  const event = await repo.findById(eventId);
  if (!event) {
    throw new AppError('Event not found', 404);
  }

  if (!event.is_public && (!currentUser || Number(currentUser.id) !== Number(event.organizer_id))) {
    throw new AppError('Forbidden', 403);
  }

  return event;
};

export const updateEvent = async (eventId, userId, payload) => {
  const event = await repo.findById(eventId);
  assertOwnership(event, userId);
  return repo.updateEvent(eventId, payload);
};

export const deleteEvent = async (eventId, userId) => {
  const event = await repo.findById(eventId);
  assertOwnership(event, userId);
  await repo.deleteEvent(eventId);
  return { success: true };
};
