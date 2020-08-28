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
    .populate({
      path: 'followers',
      select: 'firstName lastName username avatar followers followerCount following followingCount',
    })
    .populate({
      path: 'following',
      select: 'firstName lastName username avatar followers followerCount following followingCount',
    });

  if (!userFound) {
    return res.status(404).send({ error: userMessage.username.notFound });
  }

  /**
   * Return new followers list with isFollowing value of each follower
   */

  const followers = userFound.followers?.map((follower) => {
    const isFollowing = user.following?.includes(follower._id.toString());

    return { user: { ...follower.toObject(), fullName: follower.fullName }, isFollowing };
  });

  /**
   * Return new following list with isFollowing value of each following
   */

  const following = userFound.following?.map((following) => {
    const isFollowing = user.following?.includes(following._id.toString());

    return { user: { ...following.toObject(), fullName: following.fullName }, isFollowing };
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
