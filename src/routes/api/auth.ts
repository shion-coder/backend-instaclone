import { Router } from 'express';
import passport from 'passport';

import { register, login, password } from '@controllers/auth';

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
 * @route   PUT /api/auth/password
 * @desc    Verify auth & update password
 * @access  Private
 */
authRouter.route('/password').put(passport.authenticate('jwt', { session: false }), password);
