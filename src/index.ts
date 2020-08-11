import { createServer } from 'http';
import socketIo from 'socket.io';

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
 * Server and socket
 */

const server = createServer(app);
const io = socketIo(server, {
  pingTimeout: 60000,
});

app.set('io', io);

server.listen(PORT, () => logger.info(`Express - Listening on port ${PORT}`));
