import validator from 'validator';
import isEmpty from 'is-empty';

import { User, UserProps } from '@model';
import { ValidatorProps, Email } from '@types';
import { errorMessage, userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validateEmail = async ({ email }: Email): Promise<ValidatorProps<Partial<Email>>> => {
  const errors: Partial<Email> = {};

  let user: UserProps | null = null;

  /**
   * Find existing email and compare password
   */

  if (!validator.isEmpty(email) && validator.isEmail(email)) {
    try {
      user = await User.findOne({ email });
    } catch {
      throw new Error(errorMessage.findingEmail);
    }
  }

  /**
   * Email validation
   */

  validator.isEmpty(email)
    ? (errors.email = userMessage.email.required)
    : !validator.isEmail(email)
    ? (errors.email = userMessage.email.invalid)
    : !user
    ? (errors.email = userMessage.email.notFound)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
