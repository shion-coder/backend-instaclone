import validator from 'validator';
import isEmpty from 'is-empty';

import { User, UserProps } from '@model';
import { ValidatorProps, UpdateProfileProps } from '@types';
import { errorMessage, userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validateUpdateProfile = async ({
  firstName,
  lastName,
  username,
  website,
  email,
}: UpdateProfileProps): Promise<ValidatorProps<Partial<UpdateProfileProps>>> => {
  const errors: Partial<UpdateProfileProps> = {};

  let existingUsername: UserProps | null = null;
  let existingEmail: UserProps | null = null;

  const excludeUsername = ['register', 'login', 'dashboard', 'settings', 'list'];

  /**
   * Find existing username & email
   */

  if (!validator.isEmpty(username)) {
    try {
      existingUsername = await User.findOne({ username });
    } catch {
      throw new Error(errorMessage.findingUsername);
    }
  }

  if (!validator.isEmpty(email) && validator.isEmail(email)) {
    try {
      existingEmail = await User.findOne({ email });
    } catch {
      throw new Error(errorMessage.findingEmail);
    }
  }

  /**
   * First name validation
   */

  validator.isEmpty(firstName)
    ? (errors.firstName = userMessage.firstName.required)
    : !validator.isLength(firstName, { max: 30 })
    ? (errors.firstName = userMessage.firstName.maxlength)
    : null;

  /**
   * Last name validation
   */

  lastName && !validator.isLength(lastName, { max: 30 }) ? (errors.lastName = userMessage.lastName.maxlength) : null;

  /**
   * Username validation
   */

  validator.isEmpty(username)
    ? (errors.username = userMessage.username.required)
    : !validator.isLength(username, { max: 30 })
    ? (errors.username = userMessage.username.maxlength)
    : existingUsername || excludeUsername.includes(username)
    ? (errors.username = userMessage.username.exist)
    : null;

  /**
   * Email validation
   */

  validator.isEmpty(email)
    ? (errors.email = userMessage.email.required)
    : !validator.isEmail(email)
    ? (errors.email = userMessage.email.invalid)
    : existingEmail
    ? (errors.email = userMessage.email.exist)
    : null;

  /**
   * Website validation
   */

  website && validator.isURL(website) ? (errors.website = userMessage.website.invalid) : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
