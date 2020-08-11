import { Router } from 'express';

import { jwtAuth, googleAuth, facebookAuth, addSocket } from '@middleware';
import {
  register,
  login,
  google,
  facebook,
  updateName,
  updateUsername,
  updateEmail,
  updatePassword,
  logout,
} from '@controllers/auth';

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
 * @route   PUT /api/auth/name
 * @desc    Verify auth & update name
 * @access  Private
 */
authRouter.route('/name').put(jwtAuth, updateName);

/**
 * @route   PUT /api/auth/username
 * @desc    Verify auth & update username
 * @access  Private
 */
authRouter.route('/username').put(jwtAuth, updateUsername);

/**
 * @route   PUT /api/auth/email
 * @desc    Verify auth & update email
 * @access  Private
 */
authRouter.route('/email').put(jwtAuth, updateEmail);

/**
 * @route   PUT /api/auth/password
 * @desc    Verify auth & update password
 * @access  Private
 */
authRouter.route('/password').put(jwtAuth, updatePassword);

/**
 * @route   GET /api/auth/logout
 * @desc    Logout
 * @access  Public
 */
authRouter.route('/logout').get(logout);
