import { asyncHandler } from '../../common/utils/asyncHandler.js';
import * as service from './auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const result = await service.register(req.body);
  res.status(201).json(result);
});

export const login = asyncHandler(async (req, res) => {
  const result = await service.login(req.body);
  res.json(result);
});

export const me = asyncHandler(async (req, res) => {
  const result = await service.me(req.user.id);
  res.json(result);
});
