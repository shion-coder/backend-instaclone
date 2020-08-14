import { Request, Response } from 'express';

import { UserProps, Post } from '@model';
import { validatePostIdWithAuthor } from '@validation';
import { errorMessage, postMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const deletePost = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  if (!user) {
    return res.status(404).send({ error: errorMessage.noUser });
  }

  /**
   * Validate params
   */

  const { postId } = req.params;
  const { errors, isValid } = await validatePostIdWithAuthor({ id: postId, author: user.id });

  if (!isValid) {
    return res.status(400).send({ error: errors.id });
  }

  const postDelete = await Post.deleteOne({ _id: postId });

  if (!postDelete.deletedCount) {
    return res.status(500).send({ error: postMessage.errorDelete });
  }

  return res.status(204).send();
};
