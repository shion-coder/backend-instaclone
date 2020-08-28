import { Request, Response } from 'express';

import { Post } from '@model';
import { validatePostId } from '@validation';
import { postMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getPost = async (req: Request, res: Response): Promise<Response | void> => {
  /**
   * Validate id
   */

  const { id } = req.params;
  const { errors, isValid } = validatePostId({ id });

  if (!isValid) {
    return res.status(400).send({ error: errors.id });
  }

  const post = await Post.findById(id)
    .select('-__v')
    .populate({ path: 'author', select: 'fullName username avatar' })
    .lean();

  if (!post) {
    return res.status(404).send({ error: postMessage.noPost });
  }

  return res.send({ post });
};
