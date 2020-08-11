import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export type UpdatePasswordProps = {
  password: UserProps['password'];
  newPassword: UserProps['password'];
  confirmNewPassword: UserProps['password'];
};
