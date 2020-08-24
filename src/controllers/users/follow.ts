import { Request, Response } from 'express';

import { UserProps, User, Notification } from '@model';
import { validateUserIdFollow } from '@validation';
import { sendNotification } from '@socket';

/* -------------------------------------------------------------------------- */

export const follow = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  /**
   * Validate id
   */

  const { id }: { id?: UserProps['id'] } = req.params;
  const { errors, isValid } = await validateUserIdFollow({ id, currentUser: user });

  if (!isValid) {
    return res.status(400).send({ message: errors.id });
  }

  /**
   * Toggle follow / unfollow
   */

  if (user.following?.includes(id)) {
    await User.findByIdAndUpdate(id, {
      $pull: { followers: user.id },
      $inc: { followerCount: -1 },
    });

    await User.findByIdAndUpdate(user.id, {
      $pull: { following: id },
      $inc: { followingCount: -1 },
    });

    return res.send();
  }

  await User.findByIdAndUpdate(id, {
    $push: { followers: user.id },
    $inc: { followerCount: 1 },
  });

  await User.findByIdAndUpdate(user.id, {
    $push: { following: id },
    $inc: { followingCount: 1 },
  });

  const notification = await Notification.create({
    notificationType: 'follow',
    sender: user.id,
    receiver: id,
  });

  sendNotification({
    notificationType: 'follow',
    sender: {
      id: user.id,
      username: user.username,
      avatar: user.avatar as string,
    },
    receiver: id,
    date: notification.date as string,
  });

  return res.send();
};
