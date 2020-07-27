import { Schema, Document, Model, HookNextFunction, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRE } from '@config';

/* -------------------------------------------------------------------------- */

/**
 * Interface
 */

interface IUserSchema {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
}

export interface IUser extends IUserSchema, Document {
  fullName?: string;
  isAdmin?: boolean;
  comparePassword: (password: string) => Promise<boolean>;
  generateAuthToken: () => string;
}

export interface ITokenPayload {
  id: IUser['id'];
  username: IUser['username'];
  email: IUser['email'];
  isAdmin: IUser['isAdmin'];
}

/**
 * User schema
 */

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    maxlength: [30, 'First Name must be less than 30 characters'],
  },
  lastName: {
    type: String,
    maxlength: [30, 'Last Name must be less than 30 characters'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    maxlength: [30, 'Username must be less than 30 characters'],
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Hash password before save user
 */

userSchema.pre('save', async function (this: IUser, next: HookNextFunction): Promise<void> {
  if (this.password && this.isModified('password')) {
    try {
      const salt = await genSalt(10);

      this.password = await hash(this.password, salt);
    } catch {
      throw new Error('Error hashing user password');
    }
  }

  next();
});

/**
 * Get full name
 */

userSchema.virtual('fullName').get(function (this: IUser): string {
  if (!this.lastName) {
    return this.firstName;
  }

  return `${this.firstName} ${this.lastName}`;
});

/**
 * Compare password
 */

userSchema.methods.comparePassword = async function (
  this: IUser,
  password: string,
): Promise<boolean> {
  try {
    const isMatch: boolean = await compare(password, this.password);

    return isMatch;
  } catch {
    throw new Error('Error comparing password');
  }
};

/**
 * Get token
 */

userSchema.methods.generateAuthToken = function (this: IUser): string {
  const payload: ITokenPayload = {
    id: this.id,
    username: this.username,
    email: this.email,
    isAdmin: this.isAdmin,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export const User: Model<IUser> = model<IUser>('User', userSchema);
