import { Request, Response } from 'express';

import { User, UserProps } from '@model';
import { userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;
  const { username } = req.params;

  const userFound = await User.findOne({ username })
    .select('-__v -password')
    .populate({ path: 'posts', select: 'image thumbnail caption filter' })
    .populate({ path: 'bookmarks' })
    .populate({ path: 'followers', select: 'firstName lastName username avatar followers following' })
    .populate({ path: 'following', select: 'firstName lastName username avatar followers following' });

  if (!userFound) {
    return res.status(404).send({ error: userMessage.username.notFound });
  }

  /**
   * Return new followers list with isFollowing value of each follower
   */

  const followers = userFound.followers?.map((follower) => {
    const isFollowing = user.following?.includes(follower._id.toString());

    return { ...follower.toObject(), isFollowing };
  });

  /**
   * Return new following list with isFollowing value of each following
   */

  const following = userFound.following?.map((following) => {
    const isFollowing = user.following?.includes(following._id.toString());

    return { ...following.toObject(), isFollowing };
  });

  /**
   * Check current user is following this user or not
   */

  const isFollowing = userFound.followers?.map((follower) => follower._id.toString()).includes(user.id);

  return res.send({
    user: { ...userFound.toObject(), followers, following, fullName: userFound.fullName },
    isFollowing,
  });
};
