import { AppError } from '../../common/errors/AppError.js';
import { ROLES } from '../../config/roles.js';
import * as repo from './users.repository.js';

export const getMe = async (userId) => {
  const user = await repo.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};

export const updateMe = async (userId, payload) => {
  const user = await repo.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  return repo.updateById(userId, payload);
};

export const becomeOrganizer = async (userId) => {
  const user = await repo.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.role === ROLES.ORGANIZER) {
    return user;
  }

  return repo.setRole(userId, ROLES.ORGANIZER);
};
