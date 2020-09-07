import validator from 'validator';
import isEmpty from 'is-empty';

import { UserProps, User } from '@model';
import { ValidatorProps, LoginProps } from '@types';
import { errorMessage, dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validateLogin = async ({
  usernameOrEmail = '',
  password = '',
}: LoginProps): Promise<ValidatorProps<Partial<LoginProps>>> => {
  const errors: Partial<LoginProps> = {};

  let userFound: UserProps | null = null;
  let isMatch = false;

  /**
   * Find existing email and compare password
   */

  if (!validator.isEmpty(usernameOrEmail)) {
    try {
      userFound = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });

      if (userFound) {
        isMatch = await userFound.comparePassword(password);
      }
    } catch {
      throw new Error(errorMessage.findingUsernameOrEmail);
    }
  }

  /**
   * Email validation
   */

  validator.isEmpty(usernameOrEmail)
    ? (errors.usernameOrEmail = dataMessage.usernameOrEmail.required)
    : !userFound
    ? (errors.usernameOrEmail = dataMessage.usernameOrEmail.notfound)
    : null;

  /**
   * Password validation
   */

  validator.isEmpty(password)
    ? (errors.password = dataMessage.password.required)
    : !validator.isLength(password, { min: 6 })
    ? (errors.password = dataMessage.password.minlength)
    : !isMatch && !errors.usernameOrEmail
    ? (errors.password = dataMessage.password.incorrect)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
