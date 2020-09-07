import { Router } from 'express';

import { authRouter } from './auth';
import { usersRouter } from './users';
import { postRouter } from './post';
import { notificationRouter } from './notification';

/* -------------------------------------------------------------------------- */

export const apiRouter = Router();

/**
 * @route   /api/auth
 */

apiRouter.use('/auth', authRouter);

/**
 * @route   /api/users
 */

apiRouter.use('/users', usersRouter);

/**
 * @route   /api/post
 */

apiRouter.use('/post', postRouter);

/**
 * @route   /api/notifications
 */

apiRouter.use('/notifications', notificationRouter);
