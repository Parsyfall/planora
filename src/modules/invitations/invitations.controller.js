import { asyncHandler } from '../../common/utils/asyncHandler.js';
import * as service from './invitations.service.js';

export const createInvitation = asyncHandler(async (req, res) => {
  const result = await service.createInvitation(req.user.id, req.body);
  res.status(201).json(result);
});

export const listMine = asyncHandler(async (req, res) => {
  const result = await service.listMine(req.user.email);
  res.json(result);
});

export const respond = asyncHandler(async (req, res) => {
  const result = await service.respond(req.params.id, req.user.email, req.body.status);
  res.json(result);
});

export const listByEvent = asyncHandler(async (req, res) => {
  const result = await service.listByEvent(req.params.eventId, req.user.id);
  res.json(result);
});
