import { Schema, Document, Model, model } from 'mongoose';

import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

/**
 * Types
 */

type PostSchemaProps = {
  image: string;
  thumbnail?: string;
  filter?: string;
  caption?: string;
  hashtag?: { type: string }[];
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
  hashtags: [
    {
      type: String,
      lowercase: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Post: Model<PostProps> = model<PostProps>('Post', postSchema);
