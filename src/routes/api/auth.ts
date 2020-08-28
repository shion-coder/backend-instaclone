import { Router } from 'express';

import { googleAuth, addSocket } from '@middleware';
import { register, login, google } from '@controllers/auth';

/* -------------------------------------------------------------------------- */

export const authRouter = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register & return JWT token
 * @access  Public
 */

authRouter.route('/register').post(register);

/**
 * @route   POST /api/auth/login
 * @desc    Login & return JWT token
 * @access  Public
 */

authRouter.route('/login').post(login);

/**
 * @route   GET /api/auth/google
 * @desc    Login with google
 * @access  Public
 */

authRouter.route('/google').get(addSocket, googleAuth);
authRouter.route('/google/callback').get(googleAuth, google);
