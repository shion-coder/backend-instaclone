import { Request, Response } from 'express';

import { PostProps, Post, POST_PATH, COMMENT_PATH, CommentProps } from '@model';
import { selectComments, selectCommentInfo, selectCommentAuthorInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getComments = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;
  const { id, offset }: { id?: PostProps['id']; offset?: string } = req.params;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Limit number of comments send to client each request
   */

  const limit = 5;

  /**
   * Find comments with post id, then populate comments path to get author info with offset and limit
   */

  const post = await Post.findById(id)
    .select(selectComments)
    .populate({
      path: POST_PATH.COMMENTS,
      select: selectCommentInfo,
      options: { skip: Number(offset), limit, sort: { date: -1 } },
      populate: {
        path: COMMENT_PATH.AUTHOR,
        select: selectCommentAuthorInfo,
      },
    })
    .lean();

  if (!post) {
    return res.status(404).send({ error: dataMessage.noPost });
  }

  /**
   * Push isMine and isLiked to each comment in comments
   */

  const comments = post.comments.map((comment: CommentProps) => {
    const isMine = comment.author._id.toString() === user.id;
    const isLiked = comment.likes.map((like) => like.toString()).includes(user.id);

    return { ...comment, isMine, isLiked };
  });

  /**
   * If comments send reach limit number then send comments with next number to use in next query
   */

  if (comments.length === limit) {
    return res.send({ comments, next: Number(offset) + limit });
  }

  return res.send({ comments });
};
