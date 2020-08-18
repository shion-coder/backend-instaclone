import { Request } from 'express';
import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export const google = (req: Request): void => {
  const io = req.app.get('io');

  const user = req.user as UserProps;

  const { firstName, lastName, fullName, username, email, avatar, confirmed } = user;

  io.in(req.session?.socketId).emit('google', {
    user: { firstName, lastName, fullName, username, email, avatar, confirmed },
    token: user.generateAuthToken(),
  });
};
