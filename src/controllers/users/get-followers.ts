import { Request, Response } from 'express';

import { UserProps, User, USER_PATH } from '@model';
import { selectFollowers, selectFollowerInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getFollowers = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;
  const { username, offset }: { username?: UserProps['username']; offset?: string } = req.params;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Limit number of followers send to client each request
   */

  const limit = 3;

  /**
   * Find user with username, then populate followers path to get followers info, get result with offset and limit
   */

  const userFound = await User.findOne({ username })
    .select(selectFollowers)
    .populate({
      path: USER_PATH.FOLLOWERS,
      select: selectFollowerInfo,
      options: { skip: Number(offset), limit },
    })
    .lean();

  if (!userFound) {
    return res.status(404).send({ error: dataMessage.username.notFound });
  }

  /**
   * Push isFollowing, isCurrentUser to each user in followers
   */

  const followers = userFound.followers.map((follower) => {
    const isFollowing = user.following.includes(follower._id.toString());

    const isCurrentUser = follower.username === user.username;

    return { user: { ...follower }, isFollowing, isCurrentUser };
  });

  /**
   * If followers send reach limit number then send followers with next number to use in next query
   */

  if (followers.length === limit) {
    return res.send({ users: followers, next: Number(offset) + limit });
  }

  return res.send({ users: followers });
};
