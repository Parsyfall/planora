import { AppError } from '../errors/AppError.js';

export const requireFields = (payload, fields) => {
  const missing = fields.filter((field) => {
    const value = payload[field];
    return value === undefined || value === null || value === '';
  });

  if (missing.length) {
    throw new AppError('Validation failed', 400, { missing });
  }
};

export const ensureEmail = (email) => {
  const normalized = String(email || '').trim().toLowerCase();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
  if (!isValid) {
    throw new AppError('Invalid email address', 400);
  }
  return normalized;
};

export const ensurePassword = (password) => {
  if (String(password || '').length < 8) {
    throw new AppError('Password must have at least 8 characters', 400);
  }
  return password;
};

export const ensureDate = (value, fieldName = 'date') => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new AppError(`Invalid ${fieldName}`, 400);
  }
  return parsed;
};
