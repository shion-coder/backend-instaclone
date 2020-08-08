import { Request, Response } from 'express';

import { UserProps } from '@model';
import { ChangePasswordProps } from '@types';
import { validateChangePassword } from '@validation';
import { errorMessage, changePasswordMess } from '@messages';

/* -------------------------------------------------------------------------- */

export const password = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate input with default value is '' because validator only can validate string ( not undefined )
   */
  const user = req.user as UserProps;

  if (!user) {
    return res.status(404).send({ error: errorMessage.noUser });
  }

  const { password = '', newPassword = '', confirmNewPassword = '' }: ChangePasswordProps = req.body;
  const { errors, isValid } = await validateChangePassword({
    password,
    newPassword,
    confirmNewPassword,
    user,
  });

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Update user's password
   */

  user.password = newPassword;

  await user.save();

  return res.send({ message: changePasswordMess.success });
};
