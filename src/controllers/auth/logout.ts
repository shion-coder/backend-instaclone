import { Request, Response } from 'express';

/* -------------------------------------------------------------------------- */

export const logout = (req: Request, res: Response): void => {
  req.logOut();

  res.send('Logout');
};
