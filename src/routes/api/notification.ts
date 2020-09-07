import { Router } from 'express';

import { jwtAuth } from '@middleware';
import { getNotifications, readNotifications } from '@controllers/notification';

/* -------------------------------------------------------------------------- */

export const notificationRouter = Router();

/**
 * @route   GET /api/notifications/:offset
 * @desc    Get notifications
 * @access  Private
 */

notificationRouter.route('/:offset').get(jwtAuth, getNotifications);

/**
 * @route   PUT /api/notifications
 * @desc    Read notifications
 * @access  Private
 */

notificationRouter.route('/').put(jwtAuth, readNotifications);
