import { Request, Response } from 'express';

import { User } from '@model';
import { IRegisterData } from '@types';
import { validateRegister } from '@validation';

/* -------------------------------------------------------------------------- */

export const register = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate input with default value is '' because validator only can validate string ( not undefined )
   */

  const {
    firstName = '',
    lastName = '',
    username = '',
    email = '',
    password = '',
    confirmPassword = '',
  }: IRegisterData = req.body;

  const { errors, isValid } = await validateRegister({
    firstName,
    lastName,
    username,
    email,
    password,
    confirmPassword,
  });

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Create new user & return token
   */

  const user = await User.create({ firstName, lastName, username, email, password });

  return res.status(201).send({ token: user.generateAuthToken() });
};
