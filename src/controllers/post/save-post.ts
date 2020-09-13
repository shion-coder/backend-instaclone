import { Request, Response } from 'express';

import { PostProps, Post, User } from '@model';
import { validatePostId } from '@validation';
import { selectPostInfo } from '@utils';

import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const savePost = async (req: Request, res: Response): Promise<Response | void> => {
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
   * Find post with id
   */

  const post = await Post.findById(id).select(selectPostInfo);

  if (!post) {
    return res.status(404).send({ error: dataMessage.noPost });
  }

  /**
   * If user saved this post then unsaved and send isSaved as false to client
   */

  if (user.saved.includes(id)) {
    await User.findByIdAndUpdate(user.id, {
      $pull: { saved: id },
    });

    return res.send({ isSaved: false });
  }

  /**
   * User still not save this post, add this post id to saved and send isSaved as true to client
   */

  await User.findByIdAndUpdate(user.id, {
    $push: { saved: id },
  });

  return res.send({ isSaved: true });
};
