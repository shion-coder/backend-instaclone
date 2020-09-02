import { Request, Response } from 'express';

import { UserProps, Notification } from '@model';

/* -------------------------------------------------------------------------- */

export const getNotification = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  /**
   * Get offset value in params and set limit number
   */

  const { offset } = req.params;

  const limit = 5;

  /**
   * Get total unread notifications with user id of receiver
   */

  const unread = await Notification.find({ receiver: user.id, read: false }).countDocuments();

  /**
   * Find notifications with limit number and offset get in params
   */

  const notifications = await Notification.find({ receiver: user.id })
    .sort({ date: -1 })
    .select('sender notificationType notificationData read date')
    .populate({
      path: 'sender',
      select: 'fullName username avatar',
    })
    .skip(Number(offset))
    .limit(limit)
    .lean();

  /**
   * Send notifications and next number to use in query next time when notifications get reach limit number
   */

  if (notifications.length === limit) {
    return res.send({ notifications, unread, next: Number(offset) + limit });
  }

  return res.send({ notifications, unread });
};
