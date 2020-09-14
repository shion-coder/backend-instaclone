import { Request, Response } from 'express';

import { Post } from '@model';
import { selectPostSuggestedInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getSuggestedPosts = async (req: Request, res: Response): Promise<Response | void> => {
  const user = req.user;
  const { offset }: { offset?: string } = req.params;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Limit number of notifications send to client each request
   */

  const limit = 9;

  /**
   * Find posts to suggest
   */

  const posts = await Post.find()
    .sort({ date: -1 })
    .select(selectPostSuggestedInfo)
    .skip(Number(offset))
    .limit(limit)
    .lean();

  /**
   * If posts send reach limit number then send posts with next number to use in next query
   */

  if (posts.length === limit) {
    return res.send({ posts, next: Number(offset) + limit });
  }

  return res.send({ posts });
};
