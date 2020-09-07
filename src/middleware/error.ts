import { Request, Response, NextFunction } from 'express';

import { logger } from '@logger';
import { errorMessage } from '@messages';

/* -------------------------------------------------------------------------- */

/**
 * Handle exception error
 */

export const error = (err: Error, _req: Request, res: Response, next: NextFunction): void => {
  /**
   * Log error
   */

  logger.error(err.message || errorMessage.internal);

  res.status(500).send({ error: errorMessage.internal });

  next(err);
};
