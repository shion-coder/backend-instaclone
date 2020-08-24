import validator from 'validator';
import isEmpty from 'is-empty';

import { ValidatorProps, UpdateNameProps } from '@types';
import { userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validateUpdateName = ({
  firstName,
  lastName,
}: UpdateNameProps): ValidatorProps<Partial<UpdateNameProps>> => {
  const errors: Partial<UpdateNameProps> = {};

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

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
