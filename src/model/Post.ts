import { Schema, Document, Model, model } from 'mongoose';

import { UserProps, CommentProps } from '@model';
import { MODEL } from '@types';

/* -------------------------------------------------------------------------- */

type PostSchemaProps = {
  image: string;
  thumbnail: string;
  filter: string;
  caption: string;
  tags: { type: string }[];
  likes: UserProps['id'][];
  likeCount: number;
  comments: CommentProps['id'][];
  commentCount: number;
  author: UserProps['id'];
  date: string;
};

export type PostProps = PostSchemaProps & Document;

export enum POST_PATH {
  LIKES = 'likes',
  COMMENTS = 'comments',
  AUTHOR = 'author',
}

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
  likes: [{ type: Schema.Types.ObjectId, ref: MODEL.USER }],
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: MODEL.COMMENT }],
  commentCount: {
    type: Number,
    default: 0,
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

export const Post: Model<PostProps> = model<PostProps>(MODEL.POST, postSchema);
