import { Request, Response } from 'express';

import { User } from '@model';
import { UpdateProfileProps } from '@types';
import { validateUpdateProfile } from '@validation';
import { selectUserInfo } from '@utils';
import { sendEmail, templates } from '@email';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const updateProfile = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Validate update profile props
   */

  const { errors, isValid } = await validateUpdateProfile(req.body, user);

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  /**
   * Update user profile with new info, change confirmed property and send confirmation to new email if email change
   */

  const { firstName, lastName, username, website, bio, email }: UpdateProfileProps = req.body;

  user.firstName = firstName;
  user.lastName = lastName;
  user.username = username;
  user.website = website;
  user.bio = bio;

  if (email !== user.email) {
    user.email = email;
    user.confirmed = false;

    sendEmail(email, templates.confirm(user.id));
  }

  await user.save();

  /**
   * Send user info after update back to client
   */

  const userResult = await User.findById(user.id).select(selectUserInfo).lean();

  return res.send({ user: { ...userResult } });
};
