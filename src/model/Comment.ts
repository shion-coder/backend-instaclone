import { Schema, Document, Model, model } from 'mongoose';

import { UserProps, PostProps } from '@model';

/* -------------------------------------------------------------------------- */

/**
 * Types
 */

type CommentSchemaProps = {
  message: string;
  post: PostProps['id'];
  author: UserProps['id'];
};

export type CommentProps = CommentSchemaProps & Document;

/**
 * Comment schema
 */

const commentSchema: Schema = new Schema({
  message: {
    type: String,
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Comment: Model<CommentProps> = model<CommentProps>('Comment', commentSchema);
