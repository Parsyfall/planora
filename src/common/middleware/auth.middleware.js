import { verifyAccessToken } from '../utils/jwt.js';
import { AppError } from '../errors/AppError.js';

export const authMiddleware = (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError('Authentication token missing', 401));
  }

  try {
    const token = authHeader.split(' ')[1];
    req.user = verifyAccessToken(token);
    return next();
  } catch (_error) {
    return next(new AppError('Invalid or expired token', 401));
  }
};
