import { Request } from 'express';
import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export const google = (req: Request): void => {
  const io = req.app.get('io');

  const user = req.user as UserProps;

  io.in(req.session?.socketId).emit('google', {
    user: { ...user.toObject(), fullName: user.fullName },
    token: user.generateAuthToken(),
  });
};
