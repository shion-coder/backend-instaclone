import validator from 'validator';
import isEmpty from 'is-empty';

import { User, UserProps } from '@model';
import { ValidatorProps, LoginProps } from '@types';
import { errorMessage, userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validateLogin = async ({
  usernameOrEmail,
  password,
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
    ? (errors.usernameOrEmail = userMessage.usernameOrEmail.required)
    : !userFound
    ? (errors.usernameOrEmail = userMessage.usernameOrEmail.notfound)
    : null;

  /**
   * Password validation
   */

  validator.isEmpty(password)
    ? (errors.password = userMessage.password.required)
    : !validator.isLength(password, { min: 6 })
    ? (errors.password = userMessage.password.minlength)
    : !isMatch && !errors.usernameOrEmail
    ? (errors.password = userMessage.password.incorrect)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
