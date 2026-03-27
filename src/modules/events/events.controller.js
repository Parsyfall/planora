import { asyncHandler } from '../../common/utils/asyncHandler.js';
import * as service from './events.service.js';

export const createEvent = asyncHandler(async (req, res) => {
  const result = await service.createEvent(req.user.id, req.body);
  res.status(201).json(result);
});

export const listMine = asyncHandler(async (req, res) => {
  const result = await service.listMine(req.user.id);
  res.json(result);
});

export const listPublic = asyncHandler(async (_req, res) => {
  const result = await service.listPublic();
  res.json(result);
});

export const getById = asyncHandler(async (req, res) => {
  const currentUser = req.user || null;
  const result = await service.getById(req.params.id, currentUser);
  res.json(result);
});

export const updateEvent = asyncHandler(async (req, res) => {
  const result = await service.updateEvent(req.params.id, req.user.id, req.body);
  res.json(result);
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const result = await service.deleteEvent(req.params.id, req.user.id);
  res.json(result);
});
