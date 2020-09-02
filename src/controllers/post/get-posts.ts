import { Request, Response } from 'express';

import { Post } from '@model';
import { postMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getPosts = async (req: Request, res: Response): Promise<Response | void> => {
  /**
   * Get all posts with sort in newest time and author info
   */

  const posts = await Post.find()
    .sort({ date: -1 })
    .select('-__v')
    .populate({ path: 'author', select: 'fullName username avatar' })
    .lean();

  if (!posts) {
    return res.status(404).send({ error: postMessage.noPosts });
  }

  return res.send({ posts });
};
