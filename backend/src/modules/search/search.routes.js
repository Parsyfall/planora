import express from 'express';
import * as controller from './search.controller.js';

const router = express.Router();

router.get('/events', controller.searchEvents);

export default router;
