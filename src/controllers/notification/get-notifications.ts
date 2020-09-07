import { Request, Response } from 'express';

import { Notification, NOTIFICATION_PATH } from '@model';
import { selectNotificationInfo, selectNotificationSenderInfo } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getNotifications = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;
  const { offset }: { offset?: string } = req.params;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Limit number of notifications send to client each request
   */

  const limit = 5;

  /**
   * Get total unread notifications with user id of receiver
   */

  const unread = await Notification.find({ receiver: user.id, read: false }).countDocuments();

  /**
   * Find notifications with user id, then populate sender path to get sender info, get result with offset and limit
   */

  const notifications = await Notification.find({ receiver: user.id })
    .sort({ date: -1 })
    .select(selectNotificationInfo)
    .populate({ path: NOTIFICATION_PATH.SENDER, select: selectNotificationSenderInfo })
    .skip(Number(offset))
    .limit(limit)
    .lean();

  /**
   * If notifications send reach limit number then send notifications with next number to use in next query
   */

  if (notifications.length === limit) {
    return res.send({ notifications, unread, next: Number(offset) + limit });
  }

  return res.send({ notifications, unread });
};
