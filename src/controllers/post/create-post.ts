import { Request, Response } from 'express';

import { PostProps, Post, POST_PATH, User } from '@model';
import { CreatePostProps } from '@types';
import { formatCloudinaryUrl, CLOUDINARY_MODE, selectPostInfo, selectPostAuthorInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const createPost = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate file
   */

  if (!req.file) {
    return res.status(400).send({ error: dataMessage.image.required });
  }

  const user = req.user;
  const { path } = req.file;
  const { filter, caption }: CreatePostProps = req.body;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Create new post then push new post id in posts of user and increment postCount to 1
   */

  const post = await Post.create({
    image: path,
    thumbnail: formatCloudinaryUrl(path, { mode: CLOUDINARY_MODE.THUMB, width: 400, height: 400 }),
    filter,
    caption,
    author: user.id,
  } as PostProps);

  await User.findByIdAndUpdate(user.id, {
    $push: { posts: post.id },
    $inc: { postCount: 1 },
  });

  /**
   * Send result with new post properties and author info
   */

  const postResult = await Post.findById(post.id)
    .select(selectPostInfo)
    .populate({ path: POST_PATH.AUTHOR, select: selectPostAuthorInfo })
    .lean();

  return res.send({ post: postResult });
};
