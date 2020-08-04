import { Request, Response } from 'express';

import { User } from '@model';
import { Email } from '@types';
import { validateEmail } from '@validation';
import { sendEmail, templates } from '@email';
import { emailMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const resendEmail = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate input with default value is '' because validator only can validate string ( not undefined )
   */

  const { email = '' }: Email = req.body;
  const { errors, isValid } = await validateEmail({ email });

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Get user & send confirm email
   */

  const user = await User.findOne({ email });

  if (user && !user.confirmed) {
    await sendEmail(user.email, templates.confirm(user.id));

    return res.send({ message: emailMessage.resend });
  }

  return res.send({ message: emailMessage.alreadyConfirmed });
};
