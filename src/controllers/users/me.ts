import { Request, Response } from 'express';

import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export const me = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Get user after verify authentication & return user with out password
   */

  const user = req.user as UserProps;

  const { firstName, lastName, fullName, username, email, avatar, confirmed } = user;

  return res.send({
    user: { firstName, lastName, fullName, username, email, avatar, confirmed },
  });
};
