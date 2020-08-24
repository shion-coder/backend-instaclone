import { Request, Response } from 'express';

import { User } from '@model';
import { validateUserId } from '@validation';
import { emailMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const confirmEmail = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate id
   */

  const { id } = req.params;
  const { isValid } = await validateUserId({ id });

  if (!isValid) {
    return res.status(400).send({ message: emailMessage.couldNotFind });
  }

  /**
   * Get user & update confirmed field of user in database
   */

  const user = await User.findById(id);

  if (user && !user.confirmed) {
    await User.findByIdAndUpdate(id, { confirmed: true });

    return res.send({ message: emailMessage.confirmed });
  }

  return res.send({ message: emailMessage.alreadyConfirmed });
};
