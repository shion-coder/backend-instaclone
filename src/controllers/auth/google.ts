import { Request } from 'express';

import { UserProps, User } from '@model';

/* -------------------------------------------------------------------------- */

export const google = async (req: Request): Promise<void> => {
  const io = req.app.get('io');

  /**
   * Get user from google passport and filter fields to send to client through socket io with socked id room save in session
   */

  const user = req.user as UserProps;

  const userResult = await User.findById(user.id)
    .select('id firstName lastName fullName username email website bio avatar confirmed')
    .lean();

  io.in(req.session?.socketId).emit('google', {
    user: { ...userResult },
    token: user.generateAuthToken(),
  });
};
