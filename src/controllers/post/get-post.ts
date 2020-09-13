import { Request, Response } from 'express';

import { PostProps, Post, POST_PATH } from '@model';
import { validatePostId } from '@validation';
import { selectPostInfo, selectPostAuthorInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getPost = async (req: Request, res: Response): Promise<Response | void> => {
  const user = req.user;
  const { id }: { id?: PostProps['id'] } = req.params;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Validate id
   */

  const { errors, isValid } = validatePostId({ id });

  if (!isValid) {
    return res.status(400).send({ error: errors.id });
  }

  /**
   * Find post with id, then populate author path to get author info
   */

  const post = await Post.findById(id)
    .select(selectPostInfo)
    .populate({ path: POST_PATH.AUTHOR, select: selectPostAuthorInfo })
    .lean();

  if (!post) {
    return res.status(404).send({ error: dataMessage.noPost });
  }

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

  const isSaved = user.saved.map((save) => save.toString()).includes(id);

  /**
   * Check user is following author of this post or not, then return post info with author info plus ifFollowing property
   */

  const isFollowing = user.following.map((following) => following._id.toString()).includes(post.author._id.toString());

  return res.send({ post: { ...post, author: { ...post.author, isFollowing } }, isMine, isLiked, isSaved });
};
