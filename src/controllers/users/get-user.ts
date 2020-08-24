import { Request, Response } from 'express';

import { User, UserProps } from '@model';
import { userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const currentUser = req.user as UserProps;
  const { username } = req.params;

  const user = await User.findOne({ username })
    .select('-__v -password')
    .populate({ path: 'posts', select: 'image thumbnail caption filter' })
    .populate({ path: 'bookmarks' })
    .populate({ path: 'followers' })
    .populate({ path: 'following' });

  if (!user) {
    return res.status(404).send({ error: userMessage.username.notFound });
  }

  /**
   * Check followers list of this user to see who current user are following or not
   */

  user.followers?.forEach((user) => {
    user.isFollowing = false;

    if (currentUser.following?.includes(user._id.toString())) {
      user.isFollowing = true;
    }
  });

  /**
   * Check following list of this user to see who current user are following or not
   */

  user.following?.forEach((user) => {
    user.isFollowing = false;

    if (currentUser.following?.includes(user._id.toString())) {
      user.isFollowing = true;
    }
  });

  /**
   * Check current user is following this user or not
   */

  let isFollowing = false;

  const followers = user.followers?.map((follower) => follower._id.toString());

  if (followers?.includes(currentUser.id)) {
    isFollowing = true;
  }

  return res.send({ user: { ...user.toObject(), fullName: user.fullName }, isFollowing });
};
