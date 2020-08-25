import { Request, Response } from 'express';

import { UserProps, Post } from '@model';
import { formatCloudinaryUrl } from '@utils/format-cloudinary-url';
import { postMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const createPost = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  /**
   * Create new post
   */

  if (!req.file) {
    return res.status(400).send({ error: postMessage.image.required });
  }

  const { path } = req.file;

  const { caption, filter } = req.body;

  const post = await Post.create({
    image: path,
    thumbnail: formatCloudinaryUrl(path, { mode: 'thumb', width: 400, height: 400 }),
    caption,
    filter,
    author: user.id,
  });

  /**
   * Save new post to user
   */

  user.posts?.push(post.id);

  if (user.postCount !== undefined) {
    user.postCount = user.postCount + 1;
  }

  await user.save();

  const data = await post.populate({ path: 'author', select: '-__v -password -posts' }).execPopulate();

  return res.send({ data });
};
