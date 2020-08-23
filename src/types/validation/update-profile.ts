import { UserProps } from '@model';

/* -------------------------------------------------------------------------- */

export type UpdateProfileProps = {
  firstName: UserProps['firstName'];
  lastName: UserProps['lastName'];
  username: UserProps['username'];
  website: UserProps['website'];
  bio: UserProps['bio'];
  email: UserProps['email'];
};
