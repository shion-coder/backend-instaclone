import { Request, Response } from 'express';

import { UserProps, User } from '@model';
import { selectUserProfile } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;
  const { username }: { username?: UserProps['username'] } = req.params;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Find user with username
   */

  const userFound = await User.findOne({ username }).select(selectUserProfile).lean();

  if (!userFound) {
    return res.status(404).send({ error: dataMessage.username.notFound });
  }

  /**
   * Check user is following this user or not and whether is current user
   */

  const isFollowing = userFound.followers.map((follower) => follower._id.toString()).includes(user.id);

  const isCurrentUser = userFound.username === user.username;

  /**
   * Send user info with isFollowing and isCurrentUser state
   */

  return res.send({
    user: { ...userFound },
    isFollowing,
    isCurrentUser,
  });
};
