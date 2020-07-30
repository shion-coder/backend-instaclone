import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export type RegisterDataProps = {
  firstName: UserProps['firstName'];
  lastName?: UserProps['lastName'];
  username: UserProps['username'];
  email: UserProps['email'];
  password: UserProps['password'];
  confirmPassword: UserProps['password'];
};

export type RegisterErrorProps = {
  firstName?: UserProps['firstName'];
  username?: UserProps['username'];
  lastName?: UserProps['lastName'];
  email?: UserProps['email'];
  password?: UserProps['password'];
  confirmPassword?: UserProps['password'];
};
