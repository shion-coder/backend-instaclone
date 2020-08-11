import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export type PasswordProps = {
  password: UserProps['password'];
  newPassword: UserProps['password'];
  confirmNewPassword: UserProps['password'];
};
