import { Schema, Document, Model, model } from 'mongoose';

import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

/**
 * Types
 */

type NotificationSchemaProps = {
  sender: UserProps['id'];
  receiver: UserProps['id'];
  notificationType: string;
  notificationData?: Record<string, unknown>;
  read?: boolean;
  date?: string;
};

export type NotificationProps = NotificationSchemaProps & Document;

/**
 * User schema
 */

const notificationSchema: Schema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notificationType: {
    type: String,
    enum: ['follow', 'like', 'comment', 'mention'],
  },
  notificationData: Object,
  read: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Notification: Model<NotificationProps> = model<NotificationProps>('Notification', notificationSchema);
