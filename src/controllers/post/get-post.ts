import { Request, Response } from 'express';

import { UserProps, Post } from '@model';
import { validatePostId } from '@validation';
import { postMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getPost = async (req: Request, res: Response): Promise<Response | void> => {
  const user = req.user as UserProps;

  /**
   * Validate id
   */

  const { id } = req.params;

  const { errors, isValid } = validatePostId({ id });

  if (!isValid) {
    return res.status(400).send({ error: errors.id });
  }

  /**
   * Find post with id in params and populate with author info to send client
   */

  const post = await Post.findById(id)
    .select('-__v -likes -comments')
    .populate({ path: 'author', select: 'fullName username avatar' })
    .lean();

  if (!post) {
    return res.status(404).send({ error: postMessage.noPost });
  }

  /**
   * Check current user is following author of this post or not
   */

  const isFollowing = user.following?.map((following) => following._id.toString()).includes(post.author._id.toString());

  return res.send({ post: { ...post, author: { ...post.author, isFollowing } } });
};
