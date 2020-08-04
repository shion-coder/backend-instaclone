import validator from 'validator';
import isEmpty from 'is-empty';

import { User, UserProps } from '@model';
import { ValidatorProps, Id } from '@types';
import { errorMessage, userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validateId = async ({ id }: Id): Promise<ValidatorProps<Partial<Id>>> => {
  const errors: Partial<Id> = {};

  let user: UserProps | null = null;

  /**
   * Find existing email and compare password
   */

  if (!validator.isEmpty(id) && validator.isMongoId(id)) {
    try {
      user = await User.findById(id);
    } catch {
      throw new Error(errorMessage.findingId);
    }
  }

  /**
   * Id validation
   */

  validator.isEmpty(id)
    ? (errors.id = userMessage.id.required)
    : !validator.isMongoId(id)
    ? (errors.id = userMessage.id.invalid)
    : !user
    ? (errors.id = userMessage.id.notFound)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
