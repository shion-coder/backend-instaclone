import validator from 'validator';
import isEmpty from 'is-empty';

import { User, UserProps } from '@model';
import { ValidatorProps, UsernameProps } from '@types';
import { errorMessage, userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validateUsername = async ({
  username,
}: UsernameProps): Promise<ValidatorProps<Partial<UsernameProps>>> => {
  const errors: Partial<UsernameProps> = {};

  let existingUsername: UserProps | null = null;

  /**
   * Find existing username
   */

  if (!validator.isEmpty(username)) {
    try {
      existingUsername = await User.findOne({ username });
    } catch {
      throw new Error(errorMessage.findingUsername);
    }
  }

  /**
   * Username validation
   */

  validator.isEmpty(username)
    ? (errors.username = userMessage.username.required)
    : !validator.isLength(username, { max: 30 })
    ? (errors.username = userMessage.username.maxlength)
    : existingUsername
    ? (errors.username = userMessage.username.exist)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
