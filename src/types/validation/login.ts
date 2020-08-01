import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export type LoginProps = {
  usernameOrEmail: UserProps['username'] | UserProps['email'];
  password: UserProps['password'];
};
