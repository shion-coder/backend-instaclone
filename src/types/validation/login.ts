import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export type LoginDataProps = {
  usernameOrEmail: UserProps['username'] | UserProps['email'];
  password: UserProps['password'];
};

export type LoginErrorProps = {
  usernameOrEmail: UserProps['username'] | UserProps['email'];
  password?: UserProps['password'];
};
