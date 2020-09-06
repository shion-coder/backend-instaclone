import { Request } from 'express';

import { User } from '@model';

/* -------------------------------------------------------------------------- */

export const google = async (req: Request): Promise<void> => {
  const io = req.app.get('io');

  const user = req.user;

  const userResult = await User.findById(user?.id)
    .select('id firstName lastName fullName username email website bio avatar confirmed')
    .lean();

  io.in(req.session?.socketId).emit('google', {
    user: { ...userResult },
    token: user?.generateAuthToken(),
  });
};
