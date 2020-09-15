import { Request, Response } from 'express';

import { UserProps, User } from '@model';
import { selectFollowerInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const searchUsername = async (req: Request, res: Response): Promise<Response> => {
  const { username, offset }: { username?: UserProps['username']; offset?: string } = req.params;

  if (!username) {
    return res.send({ error: dataMessage.username.required });
  }

  /**
   * Limit number of users send to client each request
   */

  const limit = 3;

  /**
   * Find user with username, get result with offset and limit
   */

  const userFound = await User.find({ username: { $regex: username } })
    .select(selectFollowerInfo)
    .skip(Number(offset))
    .limit(limit)
    .lean();

  /**
   * If users send reach limit number then send users with next number to use in next query
   */

  if (userFound.length === limit) {
    return res.send({ users: userFound, next: Number(offset) + limit });
  }

  return res.send({ users: userFound });
};
