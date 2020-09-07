import { Request, Response, NextFunction } from 'express';

/* -------------------------------------------------------------------------- */

export const addSocket = (req: Request, _res: Response, next: NextFunction): void => {
  /**
   * Add socketId get in query of request from client to req.session to use in oauth
   */

  if (req.session) {
    req.session.socketId = req.query.socketId as string;
  }

  next();
};
