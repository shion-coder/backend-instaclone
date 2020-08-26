import { Request, Response } from 'express';

import { User, UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export const me = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Get user after verify authentication & return user with out password
   */

  const user = req.user as UserProps;

  const userResult = await User.findById(user.id).select('-__v -password').lean();

  return res.send({
    user: { ...userResult, fullName: user.fullName },
  });
};
