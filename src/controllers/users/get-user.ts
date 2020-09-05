import { Request, Response } from 'express';

import { UserProps, User } from '@model';
import { userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  const { username } = req.params;

  /**
   * Find user by username and populate User model with posts and saved field
   */

  const userFound = await User.findOne({ username })
    .select(
      'id fullName username email website bio avatar posts postCount saved followers followerCount followingCount',
    )
    .lean();

  if (!userFound) {
    return res.status(404).send({ error: userMessage.username.notFound });
  }

  /**
   * Check current user is following this user or not
   */

  const isFollowing = userFound.followers?.map((follower) => follower._id.toString()).includes(user.id);

  /**
   * Check is current user or not
   */

  const isCurrentUser = userFound.username === user.username;

  /**
   * Send user info with isFollowing state
   */

  return res.send({
    user: { ...userFound },
    isFollowing,
    isCurrentUser,
  });
};
