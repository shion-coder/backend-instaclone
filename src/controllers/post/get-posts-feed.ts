import { Request, Response } from 'express';

import { Post, POST_PATH } from '@model';
import { selectPostAuthorInfo, selectPostInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getPostsFeed = async (req: Request, res: Response): Promise<Response | void> => {
  const user = req.user;
  const { offset }: { offset?: string } = req.params;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Limit number of posts send to client each request
   */

  const limit = 9;

  /**
   * Find posts to send
   */

  const posts = await Post.find({ author: { $in: user.following.concat(user.id) } })
    .sort({ date: -1 })
    .select(selectPostInfo)
    .populate({ path: POST_PATH.AUTHOR, select: selectPostAuthorInfo })
    .skip(Number(offset))
    .limit(limit)
    .lean();

  const newPosts = posts.map((post) => {
    /**
     * Check current user is author of this post or not
     */

    const isMine = user.id === post.author._id.toString();

    /**
     * Check user is liked this post or not
     */

    const isLiked = post.likes.map((like) => like.toString()).includes(user.id.toString());

    /**
     * Check user is saved this post or not
     */

    const isSaved = user.saved.map((save) => save.toString()).includes(post._id.toString());

    return { post, isMine, isLiked, isSaved };
  });

  /**
   * If posts send reach limit number then send posts with next number to use in next query
   */

  if (newPosts.length === limit) {
    return res.send({ posts: newPosts, next: Number(offset) + limit });
  }

  return res.send({ posts: newPosts });
};
