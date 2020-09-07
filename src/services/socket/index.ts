import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import { TokenDecodeProps, NotificationProps } from '@model';
import { APP_VAlUES, SOCKET_EVENT } from '@types';
import { JWT_SECRET } from '@config';
import { app } from '@express';

/* -------------------------------------------------------------------------- */

/**
 * Handle socket connect, if token exist then decode token and set socket.user then join in room with in decode
 */

export const socketConnect = (): void => {
  const io: Server = app.get('io');

  io.use((socket, next) => {
    const token = socket.handshake.query.token;

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenDecodeProps;

      socket.user = decoded;
    }

    next();
  }).on(SOCKET_EVENT.CONNECTION, (socket) => {
    socket.user && socket.join(socket.user.id);
  });
};

/**
 * Send notification event
 */

export const sendNotification = (notification: NotificationProps): void => {
  const io: Server = app.get(APP_VAlUES.IO);

  io.in(notification.receiver).emit(SOCKET_EVENT.NEW_NOTIFICATION, notification);
};
