import { Router } from 'express';

import { jwtAuth, uploadSingle } from '@middleware';
import {
  confirmEmail,
  resendEmail,
  getMe,
  getUser,
  getSuggestedUser,
  getFollowers,
  getFollowing,
  getPosts,
  getSaved,
  getTagged,
  updateAvatar,
  updateProfile,
  updatePassword,
  searchUsername,
  follow,
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
 * @desc    Resend confirmation email
 * @access  Private
 */

usersRouter.route('/email/resend').post(jwtAuth, resendEmail);

/**
 * @route   GET /api/users/me
 * @desc    Get current user info
 * @access  Private
 */

usersRouter.route('/me').get(jwtAuth, getMe);

/**
 * @route   GET /api/users/suggested
 * @desc    Get suggested users
 * @access  Private
 */

usersRouter.route('/suggested').get(jwtAuth, getSuggestedUser);

/**
 * @route   GET /api/users/:username
 * @desc    Get user info with username
 * @access  Private
 */

usersRouter.route('/:username').get(jwtAuth, getUser);

/**
 * @route   GET /api/users/:username/:offset/followers
 * @desc    Get followers with username and offset
 * @access  Private
 */

usersRouter.route('/:username/:offset/followers').get(jwtAuth, getFollowers);

/**
 * @route   GET /api/users/:username/:offset/following
 * @desc    Get following with username and offset
 * @access  Private
 */

usersRouter.route('/:username/:offset/following').get(jwtAuth, getFollowing);

/**
 * @route   GET /api/users/:username/posts/:offset
 * @desc    Get post of user with username and offset
 * @access  Private
 */

usersRouter.route('/:username/posts/:offset').get(jwtAuth, getPosts);

/**
 * @route   GET /api/users/:username/saved/:offset
 * @desc    Get saved post of user with username and offset
 * @access  Private
 */

usersRouter.route('/:username/saved/:offset').get(jwtAuth, getSaved);

/**
 * @route   GET /api/users/:username/tagged/:offset
 * @desc    Get tagged post of user with username and offset
 * @access  Private
 */

usersRouter.route('/:username/tagged/:offset').get(jwtAuth, getTagged);

/**
 * @route   PUT /api/users/avatar
 * @desc    Update avatar
 * @access  Private
 */

usersRouter.route('/avatar').put(jwtAuth, uploadSingle, updateAvatar);

/**
 * @route   PUT /api/users/profile
 * @desc    Update profile
 * @access  Private
 */

usersRouter.route('/profile').put(jwtAuth, updateProfile);

/**
 * @route   PUT /api/users/password
 * @desc    Update password
 * @access  Private
 */

usersRouter.route('/password').put(jwtAuth, updatePassword);

/**
 * @route   POST /api/users/:username/follow
 * @desc    Follow / unfollow user by username
 * @access  Private
 */

usersRouter.route('/:username/follow').post(jwtAuth, follow);

/**
 * @route   GET /api/users/:username/:offset/search
 * @desc    Search username
 * @access  Private
 */

usersRouter.route('/:username/:offset/search').get(jwtAuth, searchUsername);
