import { Router } from 'express';

import { authRouter } from './auth';
import { usersRouter } from './users';

/* -------------------------------------------------------------------------- */

/**
 * API Router for /api
 */

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);

apiRouter.use('/users', usersRouter);
