import { Router } from 'express';

import { jwtAuth } from '@middleware';
import { getNotification, readNotification } from '@controllers/notification';

/* -------------------------------------------------------------------------- */

export const notificationRouter = Router();

/**
 * @route   GET /api/notification/:offset
 * @desc    Get notification
 * @access  Private
 */

notificationRouter.route('/:offset').get(jwtAuth, getNotification);

/**
 * @route   PUT /api/notification
 * @desc    Read notification
 * @access  Private
 */

notificationRouter.route('/').put(jwtAuth, readNotification);
