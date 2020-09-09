import { Router } from 'express';

import { googleAuth, addSocket } from '@middleware';
import { registerInformation, register, login, google } from '@controllers/auth';

/* -------------------------------------------------------------------------- */

export const authRouter = Router();

/**
 * @route   POST /api/auth/register/information
 * @desc    Validate register information part
 * @access  Public
 */

authRouter.route('/register/information').post(registerInformation);

/**
 * @route   POST /api/auth/register
 * @desc    Register and return user info with token
 * @access  Public
 */

authRouter.route('/register').post(register);

/**
 * @route   POST /api/auth/login
 * @desc    Login and return user info with token
 * @access  Public
 */

authRouter.route('/login').post(login);

/**
 * @route   GET /api/auth/google
 * @desc    Login with google oauth and return user info with token
 * @access  Public
 */

authRouter.route('/google').get(addSocket, googleAuth);
authRouter.route('/google/callback').get(googleAuth, google);
