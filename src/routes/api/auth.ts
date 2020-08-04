import { Router } from 'express';

import { auth } from '@middleware';
import { register, login, me, resendEmail, confirmEmail } from '@controllers/auth';

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
 * @route   POST /api/auth/email/resend
 * @desc    Resend confirm email
 * @access  Public
 */
authRouter.route('/email/resend').post(resendEmail);

/**
 * @route   GET /api/auth/email/confirm/:id
 * @desc    Confirm email with id
 * @access  Public
 */
authRouter.route('/email/confirm/:id').get(confirmEmail);

/**
 * @route   GET /api/auth/me
 * @desc    Verify auth & return user data
 * @access  Private
 */
authRouter.route('/me').get(auth, me);
