import { Request, Response } from 'express';

import { UserProps } from '@model';
import { UpdateUsernameProps } from '@types';
import { validateUpdateUsername } from '@validation';
import { updateUsernameMess } from '@messages';

/* -------------------------------------------------------------------------- */

export const updateUsername = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  /**
   * Validate input with default value is '' because validator only can validate string ( not undefined )
   */

  const { username = '' }: UpdateUsernameProps = req.body;
  const { errors, isValid } = await validateUpdateUsername({ username });

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Update user's username
   */

  user.username = username;

  await user.save();

  return res.send({ message: updateUsernameMess.success });
};
