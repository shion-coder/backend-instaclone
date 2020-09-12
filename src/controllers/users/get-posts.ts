import { Request, Response } from 'express';

import { UserProps, User, Post, POST_PATH } from '@model';
import { selectPostInfo, selectPostAuthorInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getPosts = async (req: Request, res: Response): Promise<Response> => {
  const { username, offset }: { username?: UserProps['username']; offset?: string } = req.params;

  /**
   * Find user with username
   */

  const userFound = await User.findOne({ username });

  if (!userFound) {
    return res.status(404).send({ error: dataMessage.username.notFound });
  }

  /**
   * Limit number of posts send to client each request
   */

  const limit = 9;

  /**
   * Find posts by username with offset and limit
   */

  const posts = await Post.find({ author: userFound.id })
    .sort({ date: -1 })
    .select(selectPostInfo)
    .populate({ path: POST_PATH.AUTHOR, select: selectPostAuthorInfo })
    .skip(Number(offset))
    .limit(limit)
    .lean();

  /**
   * If posts send reach limit number then send posts with next number to use in next query
   */

  if (posts?.length === limit) {
    return res.send({ posts, next: Number(offset) + limit });
  }

  return res.send({ posts });
};
