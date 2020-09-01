import { Request, Response } from 'express';

import { UserProps } from '@model';
import { sendEmail, templates } from '@email';
import { emailMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const resendEmail = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  /**
   * Get user & send confirm email
   */

  if (!user.confirmed) {
    await sendEmail(user.email, templates.confirm(user.id));

    return res.send({ message: emailMessage.resend });
  }

  return res.send({ message: emailMessage.alreadyConfirmed });
};
