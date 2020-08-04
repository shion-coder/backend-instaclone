import { Request, Response } from 'express';

import { User } from '@model';
import { validateId } from '@validation';
import { emailMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const confirmEmail = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate input with default value is '' because validator only can validate string ( not undefined )
   */

  const { id = '' } = req.params;
  const { errors, isValid } = await validateId({ id });

  if (!isValid) {
    return res.status(400).send({ errors });
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
