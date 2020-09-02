import { Request, Response } from 'express';

import { UserProps, Post } from '@model';
import { formatCloudinaryUrl } from '@utils/format-cloudinary-url';
import { postMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const createPost = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  /**
   * Check file in request
   */

  if (!req.file) {
    return res.status(400).send({ error: postMessage.image.required });
  }

  const { path } = req.file;

  const { caption, filter } = req.body;

  /**
   * Create new post
   */

  const post = await Post.create({
    image: path,
    thumbnail: formatCloudinaryUrl(path, { mode: 'thumb', width: 400, height: 400 }),
    caption,
    filter,
    author: user.id,
  });

  /**
   * Push new post id in Post model and increment 1 in post count of user
   */

  user.posts?.push(post.id);

  if (user.postCount !== undefined) {
    user.postCount = user.postCount + 1;
  }

  await user.save();

  /**
   * Send result with Post fields and author info
   */

  const postResult = await Post.findById(post.id)
    .select('-__v')
    .populate({ path: 'author', select: 'fullName username avatar' })
    .lean();

  return res.send({ post: postResult });
};
