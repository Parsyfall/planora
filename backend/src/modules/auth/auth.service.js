import { AppError } from '../../common/errors/AppError.js';
import { comparePassword, hashPassword } from '../../common/utils/password.js';
import { signAccessToken } from '../../common/utils/jwt.js';
import { ensureEmail, ensurePassword, requireFields } from '../../common/utils/validators.js';
import { ROLES } from '../../config/roles.js';
import * as repo from './auth.repository.js';

export const register = async (payload) => {
  requireFields(payload, ['firstName', 'lastName', 'email', 'password']);

  const email = ensureEmail(payload.email);
  ensurePassword(payload.password);

  const existingUser = await repo.findByEmail(email);
  if (existingUser) {
    throw new AppError('Email already in use', 409);
  }

  const passwordHash = await hashPassword(payload.password);
  const role = payload.role === ROLES.ORGANIZER ? ROLES.ORGANIZER : ROLES.USER;

  const user = await repo.createUser({
    firstName: String(payload.firstName).trim(),
    lastName: String(payload.lastName).trim(),
    email,
    phone: payload.phone ? String(payload.phone).trim() : null,
    passwordHash,
    role
  });

  const token = signAccessToken({ id: user.id, role: user.role, email: user.email });
  return { user, token };
};

export const login = async (payload) => {
  requireFields(payload, ['email', 'password']);
  const email = ensureEmail(payload.email);

  const user = await repo.findByEmail(email);
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const validPassword = await comparePassword(payload.password, user.password_hash);
  if (!validPassword) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = signAccessToken({ id: user.id, role: user.role, email: user.email });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      created_at: user.created_at
    }
  };
};

export const me = async (userId) => {
  const user = await repo.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};
