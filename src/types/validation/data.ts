import { UserProps, PostProps } from '@model';

/* -------------------------------------------------------------------------- */

export type RegisterProps = {
  firstName: UserProps['firstName'];
  lastName?: UserProps['lastName'];
  username: UserProps['username'];
  email: UserProps['email'];
  password: UserProps['password'];
  confirmPassword: UserProps['password'];
};

export type LoginProps = {
  usernameOrEmail: UserProps['username'] | UserProps['email'];
  password: UserProps['password'];
};

export type CreatePostProps = {
  caption: string;
  filter: string;
};

export type CreateCommentProp = {
  message: string;
};

export type UpdateProfileProps = {
  firstName: UserProps['firstName'];
  lastName: UserProps['lastName'];
  username: UserProps['username'];
  website: UserProps['website'];
  bio: UserProps['bio'];
  email: UserProps['email'];
};

export type UpdatePasswordProps = {
  password: UserProps['password'];
  newPassword: UserProps['password'];
  confirmNewPassword: UserProps['password'];
};

export type UserId = {
  id: UserProps['id'];
};

export type PostId = {
  id: PostProps['id'];
  author?: string;
};
