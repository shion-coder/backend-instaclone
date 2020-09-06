import { Request } from 'express';

import { SocketEvent } from '@types';

/* -------------------------------------------------------------------------- */

export const facebook = (req: Request): void => {
  /**
   * TODO:
   */

  const io = req.app.get('io');

  io.in(req.session?.socketId).emit(SocketEvent.FACEBOOK, req.user);
};
