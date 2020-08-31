import { Router } from 'express';

import { jwtAuth, uploadSingle } from '@middleware';
import {
  confirmEmail,
  resendEmail,
  me,
  getUser,
  updateAvatar,
  updateProfile,
  updatePassword,
  follow,
  getFollowers,
  getFollowing,
  getPosts,
} from '@controllers/users';

/* -------------------------------------------------------------------------- */

export const usersRouter = Router();

/**
 * @route   PUT /api/users/email/confirm/:id
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

/**
 * @route   GET /api/users/:username
 * @desc    Verify auth & return user profile
 * @access  Private
 */

usersRouter.route('/:username').get(jwtAuth, getUser);

/**
 * @route   GET /api/users/:username/posts/:offset
 * @desc    Verify auth & return posts of user
 * @access  Private
 */

usersRouter.route('/:username/posts/:offset').get(jwtAuth, getPosts);

/**
 * @route   PUT /api/users/avatar
 * @desc    Verify auth & update avatar
 * @access  Private
 */

usersRouter.route('/avatar').put(jwtAuth, uploadSingle, updateAvatar);

/**
 * @route   PUT /api/users/profile
 * @desc    Verify auth & update avatar
 * @access  Private
 */

usersRouter.route('/profile').put(jwtAuth, updateProfile);

/**
 * @route   PUT /api/users/password
 * @desc    Verify users & update password
 * @access  Private
 */

usersRouter.route('/password').put(jwtAuth, updatePassword);

/**
 * @route   POST /api/users/:id/follow
 * @desc    Verify users & follow user with id
 * @access  Private
 */

usersRouter.route('/:id/follow').post(jwtAuth, follow);

/**
 * @route   GET /api/users/:id/:offset/followers
 * @desc    Verify users & get followers list
 * @access  Private
 */

usersRouter.route('/:id/:offset/followers').get(jwtAuth, getFollowers);

/**
 * @route   GET /api/users/:id/:offset/following
 * @desc    Verify users & get following list
 * @access  Private
 */

usersRouter.route('/:id/:offset/following').get(jwtAuth, getFollowing);
