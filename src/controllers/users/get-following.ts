import { Request, Response } from 'express';

import { UserProps, User, USER_PATH } from '@model';
import { selectFollowing, selectFollowingInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getFollowing = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;
  const { username, offset }: { username?: UserProps['username']; offset?: string } = req.params;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Limit number of following send to client each request
   */

  const limit = 3;

  /**
   * Find user with username, then populate following path to get following info, get result with offset and limit
   */

  const userFound = await User.findOne({ username })
    .select(selectFollowing)
    .populate({
      path: USER_PATH.FOLLOWING,
      select: selectFollowingInfo,
      options: { skip: Number(offset), limit },
    })
    .lean();

  if (!userFound) {
    return res.status(404).send({ error: dataMessage.username.notFound });
  }

  /**
   * Push isFollowing, isCurrentUser to each user in following
   */

  const following = userFound.following.map((following) => {
    const isFollowing = user.following.includes(following._id.toString());

    const isCurrentUser = following.username === user.username;

    return { user: { ...following }, isFollowing, isCurrentUser };
  });

  /**
   * If following send reach limit number then send following with next number to use in next query
   */

  if (following.length === limit) {
    return res.send({ users: following, next: Number(offset) + limit });
  }

  return res.send({ users: following });
};
