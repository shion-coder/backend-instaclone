import { Response } from 'express';

import { User } from '@model';
import { AuthRequestProps } from '@types';
import { errorMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const me = async (req: AuthRequestProps, res: Response): Promise<Response> => {
  /**
   * Get user after verify authentication & return user with out password
   */

  const user = await User.findById(req.user?.id).select('-password -__v');

  if (!user) {
    return res.status(404).send({ error: errorMessage.noUser });
  }

  return res.send({ user });
};
