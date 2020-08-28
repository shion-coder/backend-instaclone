import { Request, Response } from 'express';

import { User } from '@model';
import { userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getFollowers = async (req: Request, res: Response): Promise<Response> => {
  /**
   * TODO: Update
   */

  const { username } = req.params;

  const userFound = await User.findOne({ username }).select('followers').populate({
    path: 'followers',
    select: 'firstName lastName username avatar',
  });

  if (!userFound) {
    return res.status(404).send({ error: userMessage.username.notFound });
  }

  return res.send(...userFound.toObject());
};
