import { Request, Response } from 'express';

import { PostProps, Post, NotificationProps, Notification, NOTIFICATION_PATH, User } from '@model';
import { NOTIFICATION_TYPE } from '@types';
import { validatePostId } from '@validation';
import {
  selectPostInfo,
  selectNotificationInfo,
  selectNotificationSenderInfo,
  formatCloudinaryUrl,
  CLOUDINARY_MODE,
} from '@utils';
import { sendNotification } from '@socket';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const likePost = async (req: Request, res: Response): Promise<Response | void> => {
  const user = req.user;
  const { id }: { id?: PostProps['id'] } = req.params;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Validate id
   */

  const { errors, isValid } = validatePostId({ id });

  if (!isValid) {
    return res.status(400).send({ error: errors.id });
  }

  /**
   * Find post with id
   */

  const post = await Post.findById(id).select(selectPostInfo);

  if (!post) {
    return res.status(404).send({ error: dataMessage.noPost });
  }

  /**
   * If user liked this post then unlike, decrease 1 number of likeCount in this post and send isLiked as false to client
   */

  if (post.likes.includes(user.id)) {
    const index = post.likes.indexOf(user.id);

    post.likes.splice(index, 1);
    post.likeCount = post.likeCount - 1;

    await post.save();

    return res.send({ isLiked: false });
  }

  /**
   * User still not yet like this post, create new like notification if author of post is not current user, add this user id to likes and increase 1 number of likeCount in this post,
   * and send isLiked as true to client
   */

  post.likes.push(user.id);
  post.likeCount = post.likeCount + 1;

  await post.save();

  if (post.author.toString() !== user.id) {
    const notification = await Notification.create({
      notificationType: NOTIFICATION_TYPE.LIKE,
      sender: user.id,
      receiver: post.author,
      notificationData: {
        postId: id,
        image: formatCloudinaryUrl(post.image, { mode: CLOUDINARY_MODE.THUMB, width: 100, height: 100 }),
        filter: post.filter,
      },
    } as NotificationProps);

    await User.findByIdAndUpdate(post.author, {
      $push: { notifications: notification.id },
    });

    /**
     * Send new like notification with sender info through socket and send isLiked state with this user back to client
     */

    const newNotification = await Notification.findById(notification.id)
      .select(selectNotificationInfo)
      .populate({ path: NOTIFICATION_PATH.SENDER, select: selectNotificationSenderInfo });

    newNotification && sendNotification(newNotification);
  }

  return res.send({ isLiked: true });
};
