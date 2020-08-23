import { Request, Response } from 'express';

import { UserProps } from '@model';
import { UpdateProfileProps } from '@types';
import { validateUpdateProfile } from '@validation';
import { updateProfileMess } from '@messages';

/* -------------------------------------------------------------------------- */

export const updateProfile = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as UserProps;

  /**
   * Validate input with default value is '' because validator only can validate string ( not undefined )
   */

  const {
    firstName = '',
    lastName = '',
    username = '',
    website = '',
    bio = '',
    email = '',
  }: UpdateProfileProps = req.body;
  const { errors, isValid } = await validateUpdateProfile({
    firstName,
    lastName,
    username,
    website,
    email,
    bio,
  });

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Update user's profile
   */

  user.firstName = firstName;
  user.lastName = lastName;
  user.username = username;
  user.website = website;
  user.bio = bio;
  user.email = email;

  await user.save();

  return res.send({ message: updateProfileMess.success });
};
