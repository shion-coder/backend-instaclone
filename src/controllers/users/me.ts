import { Request, Response } from 'express';

import { UserProps } from '@model';
import { errorMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const me = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Get user after verify authentication & return user with out password
   */

  const user = req.user as UserProps;

  if (!user) {
    return res.status(404).send({ error: errorMessage.noUser });
  }

  const { firstName, lastName, fullName, username, email, confirmed } = user;

  return res.send({
    user: { firstName, lastName, fullName, username, email, confirmed },
  });
};
