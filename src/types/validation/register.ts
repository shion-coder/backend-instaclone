import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export type RegisterProps = {
  firstName: UserProps['firstName'];
  lastName?: UserProps['lastName'];
  username: UserProps['username'];
  email: UserProps['email'];
  password: UserProps['password'];
  confirmPassword: UserProps['password'];
};
