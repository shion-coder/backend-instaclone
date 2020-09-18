import { Request, Response } from 'express';

import { Post, POST_PATH, CommentProps, COMMENT_PATH } from '@model';
import { selectPostAuthorInfo, selectPostInfo, selectCommentInfo, selectCommentAuthorInfo } from '@utils';
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
    .populate({
      path: POST_PATH.COMMENTS,
      select: selectCommentInfo,
      options: { limit: 2, sort: { date: -1 } },
      populate: {
        path: COMMENT_PATH.AUTHOR,
        select: selectCommentAuthorInfo,
      },
    })
    .skip(Number(offset))
    .limit(limit)
    .lean();

  const newPosts = posts.map((post) => {
    /**
     * Push isMine and isLiked to each comment in comments
     */

    const comments = post.comments.map((comment: CommentProps) => {
      const isMine = comment.author._id.toString() === user.id;
      const isLiked = comment.likes.map((like) => like.toString()).includes(user.id);

      return { ...comment, isMine, isLiked };
    });

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

    return { post: { ...post, comments }, isMine, isLiked, isSaved };
  });

  /**
   * If posts send reach limit number then send posts with next number to use in next query
   */

  if (newPosts.length === limit) {
    return res.send({ posts: newPosts, next: Number(offset) + limit });
  }

  return res.send({ posts: newPosts });
};
