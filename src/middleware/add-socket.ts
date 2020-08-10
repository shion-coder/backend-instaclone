import { Request, Response, NextFunction } from 'express';

/* -------------------------------------------------------------------------- */

declare global {
  namespace Express {
    interface Session {
      socketId: string;
    }
  }
}

export const addSocket = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session) {
    req.session.socketId = req.query.socketId as string;
  }

  next();
};
