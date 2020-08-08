import { PORT } from '@config';
import connectDatabase from 'src/database';
import { passportInit } from '@passport';
import app from 'src/app';
import { logger } from 'src/logger';

/* -------------------------------------------------------------------------- */

/**
 * Connect database
 */

connectDatabase();

/**
 * Initialize passport
 */

passportInit();

/**
 * Server
 */

app.listen(PORT, (err) => {
  if (err) {
    return logger.error(`Express - Error listening on port ${PORT} -`, err);
  }

  return logger.info(`Express - Listening on port ${PORT}`);
});
