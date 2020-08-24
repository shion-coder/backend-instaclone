import { Router } from 'express';

import { jwtAuth, uploadSingle } from '@middleware';
import { createPost, deletePost, getPost, getPosts } from '@controllers/post';

/* -------------------------------------------------------------------------- */

export const postRouter = Router();

/**
 * @route   GET /api/post
 * @desc    Get all post
 * @access  Public
 */
postRouter.route('/').get(getPosts);
/**
 * @route   POST /api/post
 * @desc    Create post
 * @access  Private
 */
postRouter.route('/').post(jwtAuth, uploadSingle, createPost);

/**
 * @route   GET /api/post/:id
 * @desc    Get post
 * @access  Public
 */
postRouter.route('/:id').get(getPost);

/**
 * @route   DELETE /api/post/:id
 * @desc    Delete post
 * @access  Private
 */
postRouter.route('/:id').delete(jwtAuth, deletePost);
