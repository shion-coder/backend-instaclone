import { Request, Response } from 'express';

import { UserProps } from '@model';
import { UpdatePasswordProps } from '@types';
import { validateUpdatePassword } from '@validation';
import { errorMessage, updatePasswordMess } from '@messages';

/* -------------------------------------------------------------------------- */

export const updatePassword = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate input with default value is '' because validator only can validate string ( not undefined )
   */

  const user = req.user as UserProps;

  if (!user) {
    return res.status(404).send({ error: errorMessage.noUser });
  }

  const { password = '', newPassword = '', confirmNewPassword = '' }: UpdatePasswordProps = req.body;
  const { errors, isValid } = await validateUpdatePassword({
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

  return res.send({ message: updatePasswordMess.success });
};
