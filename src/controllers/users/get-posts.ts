import { Request, Response } from 'express';

import { UserProps, User, Post } from '@model';
import { userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getPosts = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;
  const { username, offset } = req.params;

  /**
   * Verify username
   */

  const userFound = await User.findOne({ username });

  if (!userFound) {
    return res.status(404).send({ error: userMessage.username.notFound });
  }

  const limit = 9;

  const posts = await Post.find({ author: user.id })
    .sort({ date: -1 })
    .select('-__v')
    .skip(Number(offset))
    .limit(limit)
    .lean();

  return res.send({ posts });
};
