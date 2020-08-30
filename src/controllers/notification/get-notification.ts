import { Request, Response } from 'express';

import { UserProps, Notification } from '@model';

/* -------------------------------------------------------------------------- */

export const getNotification = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;
  const { offset } = req.params;

  const limit = 5;

  const unread = await Notification.find({ receiver: user.id, read: false }).countDocuments();

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

  if (notifications.length === limit) {
    return res.send({ notifications, unread, next: Number(offset) + limit });
  }

  return res.send({ notifications, unread });
};
