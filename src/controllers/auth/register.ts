import { Request, Response } from 'express';

import { User } from '@model';
import { validateRegister } from '@validation';
import { selectUserInfo } from '@utils';
import { sendEmail, templates } from '@email';

/* -------------------------------------------------------------------------- */

export const register = async (req: Request, res: Response): Promise<Response | void> => {
  /**
   * Validate register props
   */

  const { errors, isValid } = await validateRegister(req.body);

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Create new user and send confirmation email then return user info with token
   */

  const user = await User.create(req.body);

  sendEmail(user.email, templates.confirm(user.id));

  const userResult = await User.findById(user.id).select(selectUserInfo).lean();

  return res.status(201).send({
    user: { ...userResult, token: user.generateAuthToken() },
  });
};
