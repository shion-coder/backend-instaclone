import { Request, Response } from 'express';

import { UserProps, Post, Comment } from '@model';
import { validatePostIdWithAuthor } from '@validation';
import { postMessage, commentMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const deletePost = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  /**
   * Validate id
   */

  const { id } = req.params;

  const { errors, isValid } = await validatePostIdWithAuthor({ id: id, author: user.id });

  if (!isValid) {
    return res.status(400).send({ error: errors.id });
  }

  /**
   * Delete post in posts collection
   */

  const postDelete = await Post.deleteOne({ _id: id });

  if (!postDelete.deletedCount) {
    return res.status(500).send({ error: postMessage.errorDelete });
  }

  /**
   * Delete all comment related with this post
   */

  const commentDelete = await Comment.deleteMany({ post: id });

  if (!commentDelete.deletedCount) {
    return res.status(500).send({ error: commentMessage.errorDelete });
  }

  /**
   * Delete post in user
   */

  user.posts = user.posts?.filter((postId) => postId.toString() !== id.toString());

  if (user.postCount !== undefined) {
    user.postCount = user.postCount - 1;
  }

  user.save();

  /**
   * Send message notification delete successful
   */

  return res.status(204).send({ message: postMessage.delete });
};
