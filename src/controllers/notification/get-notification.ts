import { Request, Response } from 'express';

import { UserProps, User } from '@model';

/* -------------------------------------------------------------------------- */

export const getNotification = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  const userResult = await User.findById(user.id)
    .select('notifications')
    .populate({
      path: 'notifications',
      select: '-__v',
      populate: {
        path: 'sender',
        select: 'fullName username avatar followers',
      },
    })
    .lean();

  return res.send({ user: userResult });
};
