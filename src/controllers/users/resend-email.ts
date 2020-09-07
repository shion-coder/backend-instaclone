import { Request, Response } from 'express';

import { sendEmail, templates } from '@email';
import { dataMessage, actionMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const resendEmail = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Send confirmation email to user if email still not yet confirmed and send message back to client base on confirm state
   */

  if (user && user.confirmed) {
    await sendEmail(user.email, templates.confirm(user.id));

    return res.send({ message: actionMessage.email.resend });
  }

  return res.send({ message: actionMessage.email.alreadyConfirmed });
};
