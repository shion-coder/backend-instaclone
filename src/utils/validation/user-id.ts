import validator from 'validator';
import isEmpty from 'is-empty';

import { User, UserProps } from '@model';
import { ValidatorProps, UserId } from '@types';
import { errorMessage, dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validateUserId = async ({ id }: UserId): Promise<ValidatorProps<Partial<UserId>>> => {
  const errors: Partial<UserId> = {};

  let userFound: UserProps | null = null;

  /**
   * Find existing email and compare password
   */

  if (!validator.isEmpty(id) && validator.isMongoId(id)) {
    try {
      userFound = await User.findById(id);
    } catch {
      throw new Error(errorMessage.findingId);
    }
  }

  /**
   * Id validation
   */

  validator.isEmpty(id)
    ? (errors.id = dataMessage.id.required)
    : !validator.isMongoId(id)
    ? (errors.id = dataMessage.id.invalid)
    : !userFound
    ? (errors.id = dataMessage.noUser)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
