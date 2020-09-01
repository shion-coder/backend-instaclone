import { Request, Response } from 'express';

import { User } from '@model';
import { LoginProps } from '@types';
import { validateLogin } from '@validation';

/* -------------------------------------------------------------------------- */

export const login = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate input with default value is '' because validator only can validate string ( not undefined )
   */

  const { usernameOrEmail = '', password = '' }: LoginProps = req.body;
  const { errors, isValid } = await validateLogin({ usernameOrEmail, password });

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Get user & return user info with token
   */

  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  }).select('id firstName lastName fullName username email website bio avatar confirmed');

  return res.send({
    user: { ...user?.toObject() },
    token: user?.generateAuthToken(),
  });
};
