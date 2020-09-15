import { Request, Response } from 'express';

import { User } from '@model';
import { selectFollowingInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getSuggestedUser = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Limit number of suggested user send to client
   */

  const limit = 5;

  const users = await User.find({ followers: { $nin: user.id }, _id: { $ne: user.id } })
    .select(selectFollowingInfo)
    .sort({ posts: -1 })
    .limit(limit)
    .lean();

  return res.send({ users });
};
