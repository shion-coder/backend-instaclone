import { Request, Response } from 'express';

import { User } from '@model';
import { SOCKET_EVENT, APP_VAlUES } from '@types';
import { selectUserInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const google = async (req: Request, res: Response): Promise<Response | void> => {
  const user = req.user;
  const io = req.app.get(APP_VAlUES.IO);

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Get user info and return it with token
   */

  const userResult = await User.findById(user?.id).select(selectUserInfo).lean();

  io.in(req.session?.socketId).emit(SOCKET_EVENT.GOOGLE, {
    user: { ...userResult, token: user?.generateAuthToken() },
  });
};
