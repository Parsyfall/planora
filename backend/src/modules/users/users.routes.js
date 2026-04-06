import express from 'express';
import * as controller from './users.controller.js';
import { authMiddleware } from '../../common/middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/me', controller.getMe);
router.patch('/me', controller.updateMe);
router.post('/become-organizer', controller.becomeOrganizer);

export default router;
