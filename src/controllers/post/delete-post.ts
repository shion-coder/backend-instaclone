import { Request, Response } from 'express';

import { PostProps, Post, Comment, User } from '@model';
import { validatePostIdWithAuthor } from '@validation';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const deletePost = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;
  const { id }: { id?: PostProps['id'] } = req.params;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Validate id
   */

  const { errors, isValid } = await validatePostIdWithAuthor({ id: id, author: user.id });

  if (!isValid) {
    return res.status(400).send({ error: errors.id });
  }

  /**
   * Delete post in posts collection, all comment related with this post and post in posts of user
   */

  await Post.deleteOne({ _id: id });

  await Comment.deleteMany({ post: id });

  await User.findByIdAndUpdate(user.id, {
    $pull: { posts: id },
    $inc: { postCount: -1 },
  });

  /**
   * Send empty response with status 204 ( No Content )
   */

  return res.status(204).send();
};
