import validator from 'validator';
import isEmpty from 'is-empty';

import { User, UserProps } from '@model';
import { ValidatorProps, UpdateUsernameProps } from '@types';
import { errorMessage, userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validateUpdateUsername = async ({
  username,
}: UpdateUsernameProps): Promise<ValidatorProps<Partial<UpdateUsernameProps>>> => {
  const errors: Partial<UpdateUsernameProps> = {};

  let existingUsername: UserProps | null = null;

  const excludeUsername = ['register', 'login', 'dashboard', 'settings', 'list'];

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
    : existingUsername || excludeUsername.includes(username)
    ? (errors.username = userMessage.username.exist)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
