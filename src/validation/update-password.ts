import validator from 'validator';
import isEmpty from 'is-empty';

import { UserProps } from '@model';
import { ValidatorProps, UpdatePasswordProps } from '@types';
import { errorMessage, userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validateUpdatePassword = async ({
  password,
  newPassword,
  confirmNewPassword,
  user,
}: UpdatePasswordProps & { user: UserProps }): Promise<ValidatorProps<Partial<UpdatePasswordProps>>> => {
  const errors: Partial<UpdatePasswordProps> = {};

  let isMatchCurrent = false;
  let isMatchOld = false;

  if (!validator.isEmpty(password)) {
    try {
      isMatchCurrent = await user.comparePassword(password);
    } catch {
      throw new Error(errorMessage.comparingPass);
    }
  }

  if (!validator.isEmpty(newPassword)) {
    try {
      isMatchOld = await user.comparePassword(newPassword);
    } catch {
      throw new Error(errorMessage.comparingPass);
    }
  }

  /**
   * Password validation
   */

  validator.isEmpty(password)
    ? (errors.password = userMessage.password.required)
    : !validator.isLength(password, { min: 6 })
    ? (errors.password = userMessage.password.minlength)
    : !isMatchCurrent && !errors.newPassword && !errors.confirmNewPassword
    ? (errors.password = userMessage.password.incorrect)
    : null;

  /**
   * New password validation
   */

  validator.isEmpty(newPassword)
    ? (errors.newPassword = userMessage.newPassword.required)
    : !validator.isLength(password, { min: 6 })
    ? (errors.newPassword = userMessage.newPassword.minlength)
    : isMatchOld && !errors.password && !errors.confirmNewPassword
    ? (errors.password = userMessage.newPassword.different)
    : null;

  /**
   * Confirm new password validation
   */

  validator.isEmpty(confirmNewPassword)
    ? (errors.confirmNewPassword = userMessage.confirmNewPassword.required)
    : !validator.isLength(password, { min: 6 })
    ? (errors.confirmNewPassword = userMessage.confirmNewPassword.minlength)
    : !validator.equals(newPassword, confirmNewPassword)
    ? (errors.confirmNewPassword = userMessage.confirmNewPassword.notMatch)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
