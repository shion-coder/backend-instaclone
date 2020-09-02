import { Request, Response } from 'express';

import { User, Post } from '@model';
import { userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getPosts = async (req: Request, res: Response): Promise<Response> => {
  const { username, offset } = req.params;

  /**
   * Verify username
   */

  const userFound = await User.findOne({ username });

  if (!userFound) {
    return res.status(404).send({ error: userMessage.username.notFound });
  }

  const limit = 9;

  /**
   * Find posts by username with limit number and offset
   */

  const posts = await Post.find({ author: userFound.id })
    .sort({ date: -1 })
    .select('-__v')
    .skip(Number(offset))
    .limit(limit)
    .lean();

  /**
   * Send posts and next number to use in query next time when posts get reach limit number
   */

  if (posts?.length === limit) {
    return res.send({ posts: posts, next: Number(offset) + limit });
  }

  return res.send({ posts });
};
