import { Request, Response } from 'express';

import { User } from '@model';
import { LoginProps } from '@types';
import { validateLogin } from '@validation';
import { selectUserInfo } from '@utils';

/* -------------------------------------------------------------------------- */

export const login = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate login props
   */

  const { errors, isValid } = await validateLogin(req.body);

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Get user info and return it with token
   */

  const { usernameOrEmail }: LoginProps = req.body;

  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  }).select(selectUserInfo);

  return res.send({
    user: { ...user?.toObject(), token: user?.generateAuthToken() },
  });
};
