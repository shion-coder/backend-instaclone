import { Router } from 'express';

import { jwtAuth, googleAuth, facebookAuth, addSocket } from '@middleware';
import { register, login, google, facebook, me, logout } from '@controllers/auth';

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

/**
 * @route   GET /api/auth/facebook
 * @desc    Login with facebook
 * @access  Public
 */
authRouter.route('/facebook').get(facebookAuth);
authRouter.route('/facebook/callback').get(facebookAuth, facebook);

/**
 * @route   GET /api/users/me
 * @desc    Verify auth & return user data
 * @access  Private
 */
authRouter.route('/me').get(jwtAuth, me);

/**
 * @route   GET /api/auth/logout
 * @desc    Logout
 * @access  Public
 */
authRouter.route('/logout').get(logout);
