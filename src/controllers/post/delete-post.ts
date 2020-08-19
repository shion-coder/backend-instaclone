import { Request, Response } from 'express';

import { UserProps, Post } from '@model';
import { validatePostIdWithAuthor } from '@validation';
import { postMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const deletePost = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  /**
   * Validate params
   */

  const { postId } = req.params;
  const { errors, isValid } = await validatePostIdWithAuthor({ id: postId, author: user.id });

  if (!isValid) {
    return res.status(400).send({ error: errors.id });
  }

  /**
   * Delete post in posts collection
   */

  const postDelete = await Post.deleteOne({ _id: postId });

  if (!postDelete.deletedCount) {
    return res.status(500).send({ error: postMessage.errorDelete });
  }

  /**
   * Delete post in user
   */

  user.posts = user.posts?.filter((id) => id.toString() !== postId.toString());

  if (user.postCount !== undefined) {
    user.postCount = user.postCount - 1;
  }

  user.save();

  return res.status(204).send();
};
