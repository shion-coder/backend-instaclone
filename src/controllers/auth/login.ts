import { Request, Response } from 'express';

import { User } from '@model';
import { ILoginData } from '@types';
import { validateLogin } from '@validation';

/* -------------------------------------------------------------------------- */

export const login = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate input
   */

  const { usernameOrEmail = '', password = '' }: ILoginData = req.body;
  const { errors, isValid } = await validateLogin({ usernameOrEmail, password });

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Get user & return token
   */

  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });

  return res.send({ token: user?.generateAuthToken() });
};
