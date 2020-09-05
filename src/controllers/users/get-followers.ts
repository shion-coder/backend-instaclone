import { Request, Response } from 'express';

import { UserProps, User } from '@model';
import { userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getFollowers = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  /**
   * Get username and offset in params and set limit number
   */

  const { username, offset } = req.params;

  const limit = 3;

  /**
   * Find user with id in params and select followers with limit number and offset
   */

  const userFound = await User.findOne({ username })
    .select('followers')
    .populate({
      path: 'followers',
      select: 'fullName username avatar',
      options: { skip: Number(offset), limit },
    })
    .lean();

  if (!userFound) {
    return res.status(404).send({ error: userMessage.username.notFound });
  }

  /**
   * Push is following state of current user with each user in followers and send followers to client
   */

  const followers = userFound.followers?.map((follower) => {
    const isFollowing = user.following?.includes(follower._id.toString());

    /**
     * Check is current user or not
     */

    const isCurrentUser = follower.username === user.username;

    return { user: { ...follower }, isFollowing, isCurrentUser };
  });

  if (followers?.length === limit) {
    return res.send({ users: followers, next: Number(offset) + limit });
  }

  return res.send({ users: followers });
};
