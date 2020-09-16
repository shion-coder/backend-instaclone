import { Router } from 'express';

import { jwtAuth, uploadSingle } from '@middleware';
import {
  createPost,
  deletePost,
  getPostsFeed,
  getSuggestedPosts,
  getPost,
  likePost,
  likeComment,
  savePost,
  createComment,
  getComments,
  deleteComment,
} from '@controllers/post';

/* -------------------------------------------------------------------------- */

export const postRouter = Router();

/**
 * @route   GET /api/post/feed/:offset
 * @desc    Get posts feed
 * @access  Private
 */

postRouter.route('/feed/:offset').get(jwtAuth, getPostsFeed);

/**
 * @route   GET /api/post/suggested/:offset
 * @desc    Get suggested posts
 * @access  Private
 */

postRouter.route('/suggested/:offset').get(jwtAuth, getSuggestedPosts);

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

/**
 * @route   POST /api/post/:id/like
 * @desc    Like / unlike post with id
 * @access  Private
 */

postRouter.route('/:id/like').post(jwtAuth, likePost);

/**
 * @route   POST /api/post/comments/:id/like
 * @desc    Like / unlike comment with id
 * @access  Private
 */

postRouter.route('/comments/:id/like').post(jwtAuth, likeComment);

/**
 * @route   POST /api/post/:id/save
 * @desc    Save / un save post with id
 * @access  Private
 */

postRouter.route('/:id/save').post(jwtAuth, savePost);

/**
 * @route   POST /api/post/:id/comment
 * @desc    Comment
 * @access  Private
 */

postRouter.route('/:id/comment').post(jwtAuth, createComment);

/**
 * @route   DELETE /api/post/comments/:id
 * @desc    Delete comments
 * @access  Private
 */

postRouter.route('/comments/:id').delete(jwtAuth, deleteComment);

/**
 * @route   GET /api/post/:id/comments/:offset
 * @desc    Get comments of post
 * @access  Private
 */

postRouter.route('/:id/comments/:offset').get(jwtAuth, getComments);
