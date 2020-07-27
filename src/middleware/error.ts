import { Request, Response, NextFunction } from 'express';

import { logger } from 'src/logger';

/* -------------------------------------------------------------------------- */

export const error = (err: Error, _req: Request, res: Response, next: NextFunction): void => {
  logger.error(err.message || 'Internal Server Error');

  res.status(500).send({ error: err.message || 'Internal Server Error' });

  next(err);
};
