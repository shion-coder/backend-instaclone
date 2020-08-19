import { Schema, Document, Model, HookNextFunction, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { PostProps } from '@model';
import { JWT_SECRET, JWT_EXPIRE } from '@config';
import { errorMessage, userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

/**
 * Types
 */

type UserSchemaProps = {
  googleId?: string;
  facebookId?: string;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  isAdmin?: boolean;
  confirmed?: boolean;
  posts?: PostProps['id'][];
  postCount?: number;
};

export type UserProps = UserSchemaProps &
  Document & {
    fullName?: string;
    comparePassword: (password: string) => Promise<boolean>;
    generateAuthToken: () => string;
  };

export type TokenPayloadProps = {
  id: UserProps['id'];
};

/**
 * User schema
 */

const userSchema: Schema = new Schema({
  googleId: String,
  facebookId: String,
  firstName: {
    type: String,
    required: [true, userMessage.firstName.required],
    maxlength: [30, userMessage.firstName.maxlength],
  },
  lastName: {
    type: String,
    maxlength: [30, userMessage.lastName.maxlength],
  },
  username: {
    type: String,
    // required: [true, userMessage.username.required],
    // maxlength: [30, userMessage.username.required],
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, userMessage.email.required],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    // required: [true, userMessage.password.required],
    // minlength: [6, userMessage.password.minlength],
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/shion-coder/image/upload/v1597746375/avatar/txxeacnh3vanuhsemfc8_hvlpn2.png',
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  postCount: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Hash password before save user
 */

userSchema.pre('save', async function (this: UserProps, next: HookNextFunction): Promise<void> {
  if (!this.username) {
    this.username = this._id;
  }

  if (this.password && this.isModified('password')) {
    try {
      const salt = await genSalt(10);

      this.password = await hash(this.password, salt);
    } catch {
      throw new Error(errorMessage.hashingPass);
    }
  }

  next();
});

/**
 * Get full name
 */

userSchema.virtual('fullName').get(function (this: UserProps): string {
  if (!this.lastName) {
    return this.firstName;
  }

  return `${this.firstName} ${this.lastName}`;
});

/**
 * Compare password
 */

userSchema.methods.comparePassword = async function (this: UserProps, password: string): Promise<boolean> {
  try {
    if (!this.password) {
      return false;
    }

    const isMatch: boolean = await compare(password, this.password);

    return isMatch;
  } catch {
    throw new Error(errorMessage.comparingPass);
  }
};

/**
 * Get token
 */

userSchema.methods.generateAuthToken = function (this: UserProps): string {
  const payload: TokenPayloadProps = {
    id: this.id,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export const User: Model<UserProps> = model<UserProps>('User', userSchema);
