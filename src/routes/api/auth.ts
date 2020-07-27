import { Router } from 'express';

import { auth } from '@middleware';
import { register, login, me } from '@controllers/auth';

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
 * @route   Get /api/auth/me
 * @desc    Verify auth & return user data
 * @access  Private
 */
authRouter.route('/me').get(auth, me);
