import { Request, Response } from 'express';

import { UserProps } from '@model';
import { UpdateNameProps } from '@types';
import { validateUpdateName } from '@validation';
import { errorMessage, updateNameMess } from '@messages';

/* -------------------------------------------------------------------------- */

export const updateName = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate input with default value is '' because validator only can validate string ( not undefined )
   */

  const user = req.user as UserProps;

  if (!user) {
    return res.status(404).send({ error: errorMessage.noUser });
  }

  const { firstName = '', lastName = '' }: UpdateNameProps = req.body;
  const { errors, isValid } = await validateUpdateName({ firstName, lastName });

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Update user's name
   */

  user.firstName = firstName;
  user.lastName = lastName;

  await user.save();

  return res.send({ message: updateNameMess.success });
};
