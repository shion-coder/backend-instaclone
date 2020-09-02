import { Request, Response } from 'express';

import { UserProps, User } from '@model';
import { validateUserId } from '@validation';
import { userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getFollowing = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  /**
   * Get is and offset in params and valid id
   */

  const { id, offset } = req.params;

  const { errors, isValid } = await validateUserId({ id });

  if (!isValid) {
    return res.status(400).send({ message: errors.id });
  }

  const limit = 3;

  /**
   * Find user with id in params and select following with limit number and offset
   */

  const userFound = await User.findById(id)
    .select('following')
    .populate({
      path: 'following',
      select: 'fullName username avatar',
      options: { skip: Number(offset), limit },
    })
    .lean();

  if (!userFound) {
    return res.status(404).send({ error: userMessage.username.notFound });
  }

  /**
   * Push is following state of current user with each user in following and send following to client
   */

  const following = userFound.following?.map((following) => {
    const isFollowing = user.following?.includes(following._id.toString());

    return { user: { ...following }, isFollowing };
  });

  if (following?.length === limit) {
    return res.send({ users: following, next: Number(offset) + limit });
  }

  return res.send({ users: following });
};
