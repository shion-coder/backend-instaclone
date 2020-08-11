import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export type UpdateNameProps = {
  firstName: UserProps['firstName'];
  lastName?: UserProps['lastName'];
};
