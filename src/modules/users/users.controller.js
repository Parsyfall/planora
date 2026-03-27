import { asyncHandler } from '../../common/utils/asyncHandler.js';
import * as service from './users.service.js';

export const getMe = asyncHandler(async (req, res) => {
  const result = await service.getMe(req.user.id);
  res.json(result);
});

export const updateMe = asyncHandler(async (req, res) => {
  const result = await service.updateMe(req.user.id, req.body);
  res.json(result);
});

export const becomeOrganizer = asyncHandler(async (req, res) => {
  const result = await service.becomeOrganizer(req.user.id);
  res.json(result);
});
