import { Router } from 'express';

import { jwtAuth, uploadSingle } from '@middleware';
import { createPost, deletePost, getPost } from '@controllers/post';

/* -------------------------------------------------------------------------- */

export const postRouter = Router();

/**
 * @route   GET /api/post/:id
 * @desc    Get post with id
 * @access  Private
 */

postRouter.route('/:id').get(jwtAuth, getPost);

/**
 * @route   POST /api/post
 * @desc    Create post with single image
 * @access  Private
 */

postRouter.route('/').post(jwtAuth, uploadSingle, createPost);

/**
 * @route   DELETE /api/post/:id
 * @desc    Delete post with id
 * @access  Private
 */

postRouter.route('/:id').delete(jwtAuth, deletePost);
