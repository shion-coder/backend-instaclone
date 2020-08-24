import validator from 'validator';
import isEmpty from 'is-empty';

import { User, UserProps } from '@model';
import { ValidatorProps, UserId } from '@types';
import { errorMessage, userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validateUserIdFollow = async ({
  id,
  currentUser,
}: UserId & { currentUser: UserProps }): Promise<ValidatorProps<Partial<UserId>>> => {
  const errors: Partial<UserId> = {};

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
    : id === currentUser?.id
    ? (errors.id = userMessage.id.isCurrentUser)
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
