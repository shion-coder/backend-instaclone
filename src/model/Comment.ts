import { Schema, Document, Model, model } from 'mongoose';

import { UserProps, PostProps } from '@model';
import { MODEL } from '@types';

/* -------------------------------------------------------------------------- */

type CommentSchemaProps = {
  message: string;
  post: PostProps['id'];
  author: UserProps['id'];
  date: string;
};

export type CommentProps = CommentSchemaProps & Document;

export enum COMMENT_PATH {
  POSTS = 'post',
  AUTHOR = 'author',
}

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
    ref: MODEL.POST,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: MODEL.USER,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Comment: Model<CommentProps> = model<CommentProps>(MODEL.COMMENT, commentSchema);
