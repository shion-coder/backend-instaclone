import { Request } from 'express';
import { UserProps, User } from '@model';

/* -------------------------------------------------------------------------- */

export const google = async (req: Request): Promise<void> => {
  const io = req.app.get('io');

  const user = req.user as UserProps;

  const userResult = await User.findById(user.id).select('-__v -password').lean();

  io.in(req.session?.socketId).emit('google', {
    user: { ...userResult, fullName: user.fullName },
    token: user.generateAuthToken(),
  });
};
