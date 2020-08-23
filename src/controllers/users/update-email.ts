import { Request, Response } from 'express';

import { UserProps } from '@model';
import { UpdateEmailProps } from '@types';
import { validateUpdateEmail } from '@validation';
import { sendEmail, templates } from '@email';
import { updateEmailMess } from '@messages';

/* -------------------------------------------------------------------------- */

export const updateEmail = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  /**
   * Validate input with default value is '' because validator only can validate string ( not undefined )
   */

  const { email = '' }: UpdateEmailProps = req.body;
  const { errors, isValid } = await validateUpdateEmail({ email });

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Update user's email
   */

  user.email = email;
  user.confirmed = false;

  await user.save();

  sendEmail(email, templates.confirm(user.id));

  return res.send({ message: updateEmailMess.success });
};
