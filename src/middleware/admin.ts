import { Response, NextFunction } from 'express';

import { IAuthRequest } from './auth';
import { User } from '@model';

/* -------------------------------------------------------------------------- */

export const admin = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    /**
     * Find user by user id from token and check whether user is admin or not
     */

    const user = await User.findById(req.user?.id);

    if (!user?.isAdmin) {
      return res.status(403).send('Access denied');
    }

    next();
  } catch {
    return res.status(500).send({ error: 'Something went wrong. Error finding user by id' });
  }
};
