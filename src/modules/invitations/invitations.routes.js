import express from 'express';
import * as controller from './invitations.controller.js';
import { authMiddleware } from '../../common/middleware/auth.middleware.js';
import { requireRole } from '../../common/middleware/role.middleware.js';
import { ROLES } from '../../config/roles.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/mine', controller.listMine);
router.patch('/:id/respond', controller.respond);
router.post('/', requireRole(ROLES.ORGANIZER), controller.createInvitation);
router.get('/event/:eventId', requireRole(ROLES.ORGANIZER), controller.listByEvent);

export default router;
