import { AppError } from '../../common/errors/AppError.js';
import { ensureEmail, requireFields } from '../../common/utils/validators.js';
import { sendMail } from '../../common/utils/mailer.js';
import { INVITATION_STATUS } from '../../config/roles.js';
import * as eventRepo from '../events/events.repository.js';
import * as repo from './invitations.repository.js';

export const createInvitation = async (organizerId, payload) => {
  requireFields(payload, ['eventId', 'email']);

  const email = ensureEmail(payload.email);
  const event = await eventRepo.findById(payload.eventId);

  if (!event) {
    throw new AppError('Event not found', 404);
  }

  if (Number(event.organizer_id) !== Number(organizerId)) {
    throw new AppError('You do not own this event', 403);
  }

  const existing = await repo.findByEventAndEmail(payload.eventId, email);
  if (existing) {
    throw new AppError('Invitation already exists for this email', 409);
  }

  const invitation = await repo.createInvitation({
    eventId: payload.eventId,
    email,
    status: INVITATION_STATUS.PENDING
  });

  await sendMail({
    to: email,
    subject: `Invitație la eveniment: ${event.title}`,
    text: `Ai fost invitat(ă) la evenimentul ${event.title} din ${event.location} pe ${event.event_date}.`,
    html: `<p>Ai fost invitat(ă) la evenimentul <strong>${event.title}</strong>.</p>
           <p>Locație: ${event.location}</p>
           <p>Data: ${event.event_date}</p>
           <p>Ora: ${event.event_time}</p>`
  });

  return invitation;
};

export const listMine = async (email) => {
  const normalized = ensureEmail(email);
  return repo.listForEmail(normalized);
};

export const respond = async (invitationId, userEmail, status) => {
  if (![INVITATION_STATUS.ACCEPTED, INVITATION_STATUS.DECLINED].includes(status)) {
    throw new AppError('Invalid invitation response status', 400);
  }

  const invitation = await repo.findById(invitationId);
  if (!invitation) {
    throw new AppError('Invitation not found', 404);
  }

  if (invitation.guest_email !== userEmail) {
    throw new AppError('You cannot respond to this invitation', 403);
  }

  return repo.updateStatus(invitationId, status);
};

export const listByEvent = async (eventId, organizerId) => {
  const event = await eventRepo.findById(eventId);
  if (!event) {
    throw new AppError('Event not found', 404);
  }

  if (Number(event.organizer_id) !== Number(organizerId)) {
    throw new AppError('You do not own this event', 403);
  }

  return repo.listByEventId(eventId);
};
