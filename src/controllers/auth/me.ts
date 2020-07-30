import { Response } from 'express';

import { AuthRequestProps } from '@middleware';
import { User } from '@model';

/* -------------------------------------------------------------------------- */

export const me = async (req: AuthRequestProps, res: Response): Promise<Response> => {
  /**
   * Get user after verify authentication & return user with out password
   */

  const user = await User.findById(req.user?.id).select('-password');

  if (!user) {
    return res.status(404).send({ error: 'No user found' });
  }

  return res.send({ user });
};
