import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import { NotificationProps } from '@model';
import { TokenVerify, SocketEvent } from '@types';
import app from '@express';

/* -------------------------------------------------------------------------- */

declare global {
  namespace SocketIO {
    interface Socket {
      user?: TokenVerify;
    }
  }
}

export const socketConnect = (): void => {
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

export const sendNotification = (notification: NotificationProps): void => {
  const io: Server = app.get('io');

  io.in(notification.receiver).emit(SocketEvent.NEW_NOTIFICATION, notification);
};
