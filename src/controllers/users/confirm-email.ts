import { Request, Response } from 'express';

import { User } from '@model';
import { validateUserId } from '@validation';
import { actionMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const confirmEmail = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  /**
   * Validate id
   */

  const { errors, isValid } = await validateUserId({ id });

  if (!isValid) {
    return res.status(400).send({ error: errors.id });
  }

  /**
   * Get user and update confirmed property of user if it is false to true then send message to client
   */

  const user = await User.findById(id);

  if (user && !user.confirmed) {
    await User.findByIdAndUpdate(id, { confirmed: true });

    return res.send({ message: actionMessage.email.confirmed });
  }

  return res.send({ message: actionMessage.email.alreadyConfirmed });
};
