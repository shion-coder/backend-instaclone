import { Request, Response } from 'express';

import { Post } from '@model';
import { validatePostId } from '@validation';
import { postMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getPost = async (req: Request, res: Response): Promise<Response | void> => {
  /**
   * Validate params
   */

  const { postId } = req.params;
  const { errors, isValid } = await validatePostId({ id: postId });

  if (!isValid) {
    return res.status(400).send({ error: errors.id });
  }

  const post = await Post.findById(postId).select('-__v');

  if (!post) {
    return res.status(404).send({ error: postMessage.noPost });
  }

  return res.send({ post });
};
