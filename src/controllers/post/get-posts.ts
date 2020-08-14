import { Request, Response } from 'express';

import { Post } from '@model';
import { postMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getPosts = async (req: Request, res: Response): Promise<Response | void> => {
  const posts = await Post.find().sort({ date: -1 }).select('-__v');

  if (!posts) {
    return res.status(404).send({ error: postMessage.noPosts });
  }

  return res.send({ posts });
};
