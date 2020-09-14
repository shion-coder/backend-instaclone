import { Request, Response } from 'express';

import { CommentProps, Comment, Post, User, NotificationProps, Notification, NOTIFICATION_PATH } from '@model';
import { NOTIFICATION_TYPE } from '@types';
import { validatePostId } from '@validation';
import {
  selectPostInfo,
  selectCommentInfo,
  selectNotificationInfo,
  selectNotificationSenderInfo,
  formatCloudinaryUrl,
  CLOUDINARY_MODE,
} from '@utils';
import { sendNotification } from '@socket';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const likeComment = async (req: Request, res: Response): Promise<Response | void> => {
  const user = req.user;
  const { id }: { id?: CommentProps['id'] } = req.params;

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
   * Find comment with id and post of this comment
   */

  const comment = await Comment.findById(id).select(selectCommentInfo);

  if (!comment) {
    return res.status(404).send({ error: dataMessage.noComment });
  }

  const post = await Post.findById(comment.post).select(selectPostInfo);

  if (!post) {
    return res.status(404).send({ error: dataMessage.noPost });
  }

  /**
   * If user liked this post then unlike, decrease 1 number of likeCount in this post and send isLiked as false to client
   */

  if (comment.likes.includes(user.id)) {
    await Comment.findByIdAndUpdate(comment.id, {
      $pull: { likes: user.id },
      $inc: { likeCount: -1 },
    });

    return res.send({ isLiked: false });
  }

  /**
   * User still not yet like this comment, create new like notification if author of post is not current user, add this user id to likes and increase 1 number of likeCount in this comment,
   * and send isLiked as true to client
   */

  await Comment.findByIdAndUpdate(comment.id, {
    $push: { likes: user.id },
    $inc: { likeCount: 1 },
  });

  if (comment.author.toString() !== user.id) {
    const notification = await Notification.create({
      notificationType: NOTIFICATION_TYPE.LIKE_COMMENT,
      sender: user.id,
      receiver: comment.author,
      notificationData: {
        postId: id,
        image: formatCloudinaryUrl(post.image, { mode: CLOUDINARY_MODE.THUMB, width: 100, height: 100 }),
        filter: post.filter,
      },
    } as NotificationProps);

    await User.findByIdAndUpdate(comment.author, {
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
