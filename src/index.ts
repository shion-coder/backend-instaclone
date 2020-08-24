import { createServer } from 'http';
import socketIo from 'socket.io';

import { PORT } from '@config';
import connectDatabase from '@database';
import app from '@express';
import { passportInit } from '@passport';
import { socketConnect } from '@socket';
import { logger } from '@logger';

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
 * Create server and socket
 */

const server = createServer(app);

const io = socketIo(server, {
  pingTimeout: 60000,
});

app.set('io', io);

socketConnect();

server.listen(PORT, () => logger.info(`Express - Listening on port ${PORT}`));
