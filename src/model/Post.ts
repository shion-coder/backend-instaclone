import { Schema, Document, Model, model } from 'mongoose';

import { UserProps, CommentProps } from '@model';

/* -------------------------------------------------------------------------- */

/**
 * Types
 */

type PostSchemaProps = {
  image: string;
  thumbnail?: string;
  filter?: string;
  caption?: string;
  tags?: { type: string }[];
  likes?: UserProps['id'][];
  likesCount?: number;
  comment?: CommentProps['id'][];
  commentCount?: number;
  author: UserProps['id'];
};

export type PostProps = PostSchemaProps & Document;

/**
 * User schema
 */

const postSchema: Schema = new Schema({
  image: {
    type: String,
    required: true,
  },
  thumbnail: String,
  filter: String,
  caption: String,
  tags: [
    {
      type: String,
      lowercase: true,
    },
  ],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likesCount: {
    type: Number,
    default: 0,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  commentsCount: {
    type: Number,
    default: 0,
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

export const Post: Model<PostProps> = model<PostProps>('Post', postSchema);
