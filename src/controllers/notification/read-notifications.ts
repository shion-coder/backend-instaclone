import { Request, Response } from 'express';

import { Notification } from '@model';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const readNotifications = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Read all notifications in unread state of receiver with user id
   */

  await Notification.updateMany({ receiver: user.id }, { read: true });

  /**
   * Send empty response with status 204 ( No Content )
   */

  return res.status(204).send();
};
