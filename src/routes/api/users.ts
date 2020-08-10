import { Router } from 'express';

import { jwtAuth } from '@middleware';
import { confirmEmail, resendEmail, me } from '@controllers/users';

/* -------------------------------------------------------------------------- */

export const usersRouter = Router();

/**
 * @route   PUT /api/user/email/confirm/:id
 * @desc    Confirm email with id
 * @access  Public
 */
usersRouter.route('/email/confirm/:id').put(confirmEmail);

/**
 * @route   POST /api/users/email/resend
 * @desc    Resend confirm email
 * @access  Public
 */
usersRouter.route('/email/resend').post(resendEmail);

/**
 * @route   GET /api/users/me
 * @desc    Verify auth & return user data
 * @access  Private
 */
usersRouter.route('/me').get(jwtAuth, me);
