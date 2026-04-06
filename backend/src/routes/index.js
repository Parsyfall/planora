import express from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import usersRoutes from '../modules/users/users.routes.js';
import eventsRoutes from '../modules/events/events.routes.js';
import invitationsRoutes from '../modules/invitations/invitations.routes.js';
import searchRoutes from '../modules/search/search.routes.js';
import vendorsRoutes from '../modules/vendors/vendors.routes.js';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/events', eventsRoutes);
router.use('/invitations', invitationsRoutes);
router.use('/search', searchRoutes);
router.use('/vendors', vendorsRoutes);

export default router;
