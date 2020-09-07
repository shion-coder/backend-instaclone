import { Request, Response } from 'express';

import { User } from '@model';
import { selectUserInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getMe = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Select user properties to send client
   */

  const userResult = await User.findById(user.id).select(selectUserInfo).lean();

  return res.send({ user: { ...userResult } });
};
