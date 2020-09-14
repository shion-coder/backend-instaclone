import { Schema, Document, Model, model } from 'mongoose';

import { UserProps } from '@model';
import { MODEL, NOTIFICATION_TYPE } from '@types';

/* -------------------------------------------------------------------------- */

type NotificationSchemaProps = {
  notificationType: string;
  notificationData?: {
    postId: string;
    image: string;
    filter: string;
  };
  sender: UserProps['id'];
  receiver: UserProps['id'];
  read: boolean;
  date: string;
};

export type NotificationProps = NotificationSchemaProps & Document;

export enum NOTIFICATION_PATH {
  SENDER = 'sender',
  RECEIVER = 'receiver',
}

/**
 * Notification schema
 */

const notificationSchema: Schema = new Schema({
  notificationType: {
    type: String,
    enum: [
      NOTIFICATION_TYPE.FOLLOW,
      NOTIFICATION_TYPE.LIKE_POST,
      NOTIFICATION_TYPE.LIKE_COMMENT,
      NOTIFICATION_TYPE.COMMENT_POST,
      NOTIFICATION_TYPE.COMMENT_COMMENT,
      NOTIFICATION_TYPE.MENTION,
    ],
    required: true,
  },
  notificationData: {
    postId: String,
    image: String,
    filter: String,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: MODEL.USER,
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: MODEL.USER,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Notification: Model<NotificationProps> = model<NotificationProps>(MODEL.NOTIFICATION, notificationSchema);
