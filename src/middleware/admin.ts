import { Response, NextFunction } from 'express';

import { User } from '@model';
import { AuthRequestProps } from '@types';
import { errorMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const admin = async (req: AuthRequestProps, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    /**
     * Find user by user id from token and check whether user is admin or not
     */

    const user = await User.findById(req.user?.id);

    if (!user?.isAdmin) {
      return res.status(403).send({ error: errorMessage.noPermission });
    }

    next();
  } catch {
    return res.status(500).send({ error: errorMessage.findingId });
  }
};
