import { Request, Response } from 'express';

import { UserProps, User, Notification } from '@model';
import { sendNotification } from '@socket';
import { userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const follow = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  /**
   * Get username in params and find this user
   */

  const { username } = req.params;

  const userFound = await User.findOne({ username }).select('id').lean();

  if (!userFound) {
    return res.status(404).send({ error: userMessage.username.notFound });
  }

  /**
   * If user already follow this user id then unfollow and decrease 1 number of follower count in this user, 1 number of following count in current user
   */

  if (user.following?.includes(userFound._id)) {
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
   * Create new follow notification, follow user and increase 1 number of follower count in this user, 1 number of following count in current user
   */

  const notification = await Notification.create({
    notificationType: 'follow',
    sender: user.id,
    receiver: userFound._id,
  });

  await User.findByIdAndUpdate(userFound._id, {
    $push: { followers: user.id, notifications: notification.id },
    $inc: { followerCount: 1 },
  });

  await User.findByIdAndUpdate(user.id, {
    $push: { following: userFound._id },
    $inc: { followingCount: 1 },
  });

  /**
   * Send new follow notification with sender info and is following state with this user
   */

  const newNotification = await Notification.findById(notification.id)
    .select('sender receiver notificationType notificationData read date')
    .populate({ path: 'sender', select: 'fullName username avatar' });

  newNotification && sendNotification(newNotification);

  return res.send({ isFollowing: true });
};
