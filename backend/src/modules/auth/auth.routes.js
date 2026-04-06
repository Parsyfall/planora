import express from 'express';
import * as controller from './auth.controller.js';
import { authMiddleware } from '../../common/middleware/auth.middleware.js';
import { authRateLimit } from '../../common/middleware/rateLimit.middleware.js';

const router = express.Router();

router.post('/register', authRateLimit, controller.register);
router.post('/login', authRateLimit, controller.login);
router.get('/me', authMiddleware, controller.me);

export default router;
