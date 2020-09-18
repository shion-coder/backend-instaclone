import { Request, Response } from 'express';

import { Post, CommentProps, Comment } from '@model';
import { validateCommentIdWithAuthor } from '@validation';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const deleteComment = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;
  const { id }: { id?: CommentProps['id'] } = req.params;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Validate id
   */

  const { errors, isValid } = await validateCommentIdWithAuthor({ id: id, author: user.id });

  if (!isValid) {
    return res.status(400).send({ error: errors.id });
  }

  /**
   * Delete comment in Comment model and in post
   */

  const comment = await Comment.findById(id).lean();

  await Comment.deleteOne({ _id: id });

  await Post.findByIdAndUpdate(comment?.post, {
    $pull: { comments: id },
    $inc: { commentCount: -1 },
  });

  return res.send({ id });
};
