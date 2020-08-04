import { Request, Response, NextFunction } from 'express';

import { logger } from 'src/logger';
import { errorMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const error = (err: Error, _req: Request, res: Response, next: NextFunction): void => {
  logger.error(err.message || errorMessage.internal);

  res.status(500).send({ error: errorMessage.internal });

  next(err);
};
