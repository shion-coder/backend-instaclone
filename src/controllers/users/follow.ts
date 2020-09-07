import { Request, Response } from 'express';

import { UserProps, User, NotificationProps, Notification, NOTIFICATION_PATH } from '@model';
import { NOTIFICATION_TYPE } from '@types';
import { selectNotificationInfo, selectNotificationSenderInfo } from '@utils';
import { sendNotification } from '@socket';
import { dataMessage, actionMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const follow = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;
  const { username }: { username?: UserProps['username'] } = req.params;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Check username to follow is username of current user or not
   */

  if (user.username === username) {
    return res.status(404).send({ error: actionMessage.user.followCurrentUser });
  }

  /**
   * Find user with username
   */

  const userFound = await User.findOne({ username }).lean();

  if (!userFound) {
    return res.status(404).send({ error: dataMessage.username.notFound });
  }

  /**
   * If user already follow this user id then unfollow, decrease 1 number of followerCount in this user, 1 number of followingCount in current user,
   * remove this user id in following and send isFollowing as false to client
   */

  if (user.following.includes(userFound._id.toString())) {
    await User.findByIdAndUpdate(userFound._id, {
      $pull: { followers: user.id },
      $inc: { followerCount: -1 },
    });

    await User.findByIdAndUpdate(user.id, {
      $pull: { following: userFound._id },
      $inc: { followingCount: -1 },
    });

    return res.send({ isFollowing: false });
  }

  /**
   * User still not yet follow this user, create new follow notification, add this user id to followers and increase 1 number of followerCount in this user,
   * 1 number of followingCount in current user and send isFollowing as true to client
   */

  const notification = await Notification.create({
    notificationType: NOTIFICATION_TYPE.FOLLOW,
    sender: user.id,
    receiver: userFound._id,
  } as NotificationProps);

  await User.findByIdAndUpdate(userFound._id, {
    $push: { followers: user.id, notifications: notification.id },
    $inc: { followerCount: 1 },
  });

  await User.findByIdAndUpdate(user?.id, {
    $push: { following: userFound._id },
    $inc: { followingCount: 1 },
  });

  /**
   * Send new follow notification with sender info through socket and send isFollowing state with this user back to client
   */

  const newNotification = await Notification.findById(notification.id)
    .select(selectNotificationInfo)
    .populate({ path: NOTIFICATION_PATH.SENDER, select: selectNotificationSenderInfo });

  newNotification && sendNotification(newNotification);

  return res.send({ isFollowing: true });
};
