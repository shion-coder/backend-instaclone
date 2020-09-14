import { Request, Response } from 'express';

import {
  PostProps,
  Post,
  CommentProps,
  Comment,
  COMMENT_PATH,
  NotificationProps,
  Notification,
  NOTIFICATION_PATH,
  User,
} from '@model';
import { CreateCommentProp, NOTIFICATION_TYPE } from '@types';
import { validatePostId } from '@validation';
import {
  selectPostInfo,
  selectCommentInfo,
  selectCommentAuthorInfo,
  selectNotificationInfo,
  selectNotificationSenderInfo,
  formatCloudinaryUrl,
  CLOUDINARY_MODE,
} from '@utils';
import { sendNotification } from '@socket';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const createComment = async (req: Request, res: Response): Promise<Response | void> => {
  const user = req.user;
  const { id }: { id?: PostProps['id'] } = req.params;
  const { message }: CreateCommentProp = req.body;

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
   * Validate message
   */

  if (!message) {
    return res.status(400).send({ error: dataMessage.message.required });
  }

  /**
   * Create new comment, add new comment id to comments in post
   */

  const comment = await Comment.create({
    message,
    post: id,
    author: user.id,
  } as CommentProps);

  post.comments.push(comment.id);
  post.commentCount = post.commentCount + 1;

  await post.save();

  /**
   * Send result with new comment properties and author info
   */

  const commentResult = await Comment.findById(comment.id)
    .select(selectCommentInfo)
    .populate({ path: COMMENT_PATH.AUTHOR, select: selectCommentAuthorInfo })
    .lean();

  res.send({ comment: commentResult });

  /**
   * If user not is author of this post then create new notification and send notification through socket
   */

  if (post.author.toString() !== user.id) {
    const notification = await Notification.create({
      notificationType: NOTIFICATION_TYPE.COMMENT_POST,
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
};
