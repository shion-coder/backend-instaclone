import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export type ChangePasswordProps = {
  password: UserProps['password'];
  newPassword: UserProps['password'];
  confirmNewPassword: UserProps['password'];
};
