import { createServer } from 'http';
import socketIo from 'socket.io';

import { APP_VAlUES } from '@types';
import { PORT } from '@config';
import { connectDatabase } from '@database';
import { app } from '@express';
import { passportInit } from '@passport';
import { socketConnect } from '@socket';
import { logger } from '@logger';

/* -------------------------------------------------------------------------- */

/**
 * Connect database and initialize passport
 */

connectDatabase();

passportInit();

/**
 * Setup server and socket then set io value in app values
 */

const server = createServer(app);

const io = socketIo(server, { pingTimeout: 60000 });

app.set(APP_VAlUES.IO, io);

/**
 * Connect socket and server
 */

socketConnect();

server.listen(PORT, () => logger.info(`Express - Listening on port ${PORT}`));
