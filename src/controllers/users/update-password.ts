import { Request, Response } from 'express';

import { UpdatePasswordProps } from '@types';
import { validateUpdatePassword } from '@validation';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const updatePassword = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Validate update password props
   */

  const { errors, isValid } = await validateUpdatePassword(req.body, user);

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Update user password with new password, password auto hash when user save
   */

  const { newPassword }: UpdatePasswordProps = req.body;

  user.password = newPassword;

  await user.save();

  /**
   * Send empty response with status 204 ( No Content )
   */

  return res.status(204).send();
};
