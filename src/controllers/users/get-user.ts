import { Request, Response } from 'express';

import { UserProps, User } from '@model';
import { userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;
  const { username } = req.params;

  const userFound = await User.findOne({ username })
    .select('id fullName username email website bio avatar postCount followers followerCount followingCount')
    .lean();

  if (!userFound) {
    return res.status(404).send({ error: userMessage.username.notFound });
  }

  /**
   * Check current user is following this user or not
   */

  const isFollowing = userFound.followers?.map((follower) => follower._id.toString()).includes(user.id);

  /**
   * Return new following list with isFollowing value of each following
   */

  // const following = userFound.following?.map((following) => {
  //   const isFollowing = user.following?.includes(following._id.toString());

  //   return { user: { ...following.toObject() }, isFollowing };
  // });

  return res.send({
    user: { ...userFound },
    isFollowing,
  });
};
