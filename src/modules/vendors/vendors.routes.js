import express from 'express';
import * as controller from './vendors.controller.js';
import { authMiddleware } from '../../common/middleware/auth.middleware.js';
import { requireRole } from '../../common/middleware/role.middleware.js';
import { ROLES } from '../../config/roles.js';

const router = express.Router();

router.get('/', controller.listVendors);
router.use(authMiddleware);
router.post('/', requireRole(ROLES.ORGANIZER), controller.createVendor);
router.patch('/:id', requireRole(ROLES.ORGANIZER), controller.updateVendor);
router.delete('/:id', requireRole(ROLES.ORGANIZER), controller.deleteVendor);

export default router;
