import { Request } from 'express';

/* -------------------------------------------------------------------------- */

export const facebook = (req: Request): void => {
  /**
   * TODO:
   */

  const io = req.app.get('io');

  io.in(req.session?.socketId).emit('google', req.user);
};
