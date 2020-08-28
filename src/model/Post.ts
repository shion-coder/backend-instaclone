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
  likeCount?: number;
  comments?: CommentProps['id'][];
  commentCount?: number;
  author: UserProps['id'];
  date?: string;
};

export type PostProps = PostSchemaProps & Document;

/**
 * Post schema
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
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  commentCount: {
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
