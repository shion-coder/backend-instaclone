import { Request, Response } from 'express';

import { UserProps } from '@model';
import { UsernameProps } from '@types';
import { validateUsername } from '@validation';
import { errorMessage, updateUsernameMess } from '@messages';

/* -------------------------------------------------------------------------- */

export const username = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate input with default value is '' because validator only can validate string ( not undefined )
   */
  const user = req.user as UserProps;

  if (!user) {
    return res.status(404).send({ error: errorMessage.noUser });
  }

  const { username = '' }: UsernameProps = req.body;
  const { errors, isValid } = await validateUsername({ username });

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Update user's password
   */

  user.username = username;

  await user.save();

  return res.send({ message: updateUsernameMess.success });
};
