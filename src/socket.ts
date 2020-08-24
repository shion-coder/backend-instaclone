import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import app from 'src/app';
import { TokenVerify } from '@types';

/* -------------------------------------------------------------------------- */

declare global {
  namespace SocketIO {
    interface Socket {
      user?: TokenVerify;
    }
  }
}

const socketConnection = (): void => {
  const io: Server = app.get('io');

  io.use((socket, next) => {
    const token = socket.handshake.query.token;

    if (token) {
      const user = jwt.decode(token) as TokenVerify;

      socket.user = user;
    }

    next();
  }).on('connection', (socket) => {
    socket.user && socket.join(socket.user.id);
  });
};

export default socketConnection;
