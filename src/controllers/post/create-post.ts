import { Request, Response } from 'express';

import { UserProps, Post } from '@model';
import { formatCloudinaryUrl } from '@utils/format-cloudinary-url';
import { postMessage, errorMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const createPost = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  if (!user) {
    return res.status(404).send({ error: errorMessage.noUser });
  }

  if (!req.file) {
    return res.status(400).send({ error: postMessage.image.required });
  }

  const { path } = req.file;

  const post = await Post.create({
    image: path,
    thumbnail: formatCloudinaryUrl(path, { mode: 'thumb', width: 400, height: 400 }),
    author: user.id,
  });

  return res.send({ image: path, thumbnail: post.thumbnail, author: user.username });
};
