import express from 'express';
import * as controller from './events.controller.js';
import { authMiddleware } from '../../common/middleware/auth.middleware.js';
import { requireRole } from '../../common/middleware/role.middleware.js';
import { ROLES } from '../../config/roles.js';

const router = express.Router();

router.get('/public', controller.listPublic);
router.get('/:id', optionalAuth, controller.getById);
router.use(authMiddleware);
router.get('/mine/list', requireRole(ROLES.ORGANIZER), controller.listMine);
router.post('/', requireRole(ROLES.ORGANIZER), controller.createEvent);
router.patch('/:id', requireRole(ROLES.ORGANIZER), controller.updateEvent);
router.delete('/:id', requireRole(ROLES.ORGANIZER), controller.deleteEvent);

function optionalAuth(req, _res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next();
  }
  return authMiddleware(req, _res, next);
}

export default router;
