import { AppError } from '../errors/AppError.js';

export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new AppError('Forbidden', 403));
  }
  return next();
};
