import { Request, Response } from 'express';

import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export const getNotification = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  const { notifications } = await user
    .populate({
      path: 'notifications',
      select: '-__v',
      populate: {
        path: 'sender',
        select: 'firstName lastName username email avatar followers',
      },
    })
    .execPopulate();

  return res.send({ notifications });
};
