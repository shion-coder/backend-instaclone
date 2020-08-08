import { Request, Response, NextFunction } from 'express';

import { UserProps } from '@model';
import { errorMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const admin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    /**
     * Find user by user id from token and check whether user is admin or not
     */

    const user = req.user as UserProps;

    if (!user?.isAdmin) {
      return res.status(403).send({ error: errorMessage.noPermission });
    }

    next();
  } catch {
    return res.status(500).send({ error: errorMessage.findingId });
  }
};
