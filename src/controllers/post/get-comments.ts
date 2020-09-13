import { Request, Response } from 'express';

import { Post, POST_PATH, COMMENT_PATH } from '@model';
import { selectComments, selectCommentInfo, selectCommentAuthorInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getComments = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;
  const { id, offset }: { id?: string; offset?: string } = req.params;

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
      options: { skip: Number(offset), limit },
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
   * Push isMine to each comment in comments
   */

  const comments = post.comments.map((comment) => {
    const isMine = comment.author._id.toString() === user.id;

    return { ...comment, isMine };
  });

  /**
   * If comments send reach limit number then send comments with next number to use in next query
   */

  if (comments.length === limit) {
    return res.send({ comments, next: Number(offset) + limit });
  }

  return res.send({ comments });
};
