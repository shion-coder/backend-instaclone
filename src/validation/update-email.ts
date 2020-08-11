import validator from 'validator';
import isEmpty from 'is-empty';

import { User, UserProps } from '@model';
import { ValidatorProps, UpdateEmailProps } from '@types';
import { errorMessage, userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validateUpdateEmail = async ({
  email,
}: UpdateEmailProps): Promise<ValidatorProps<Partial<UpdateEmailProps>>> => {
  const errors: Partial<UpdateEmailProps> = {};

  let existingEmail: UserProps | null = null;

  /**
   * Find existing username
   */

  if (!validator.isEmpty(email) && validator.isEmail(email)) {
    try {
      existingEmail = await User.findOne({ email });
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
    : existingEmail
    ? (errors.email = userMessage.email.exist)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
