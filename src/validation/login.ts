import validator from 'validator';
import isEmpty from 'is-empty';

import { User, UserProps } from '@model';

import { ValidatorProps, LoginProps } from '@types';

/* -------------------------------------------------------------------------- */

export const validateLogin = async ({
  usernameOrEmail,
  password,
}: LoginProps): Promise<ValidatorProps<Partial<LoginProps>>> => {
  const errors: Partial<LoginProps> = {};

  let user: UserProps | null = null;
  let isMatch = false;

  /**
   * Find existing email and compare password
   */

  if (!validator.isEmpty(usernameOrEmail)) {
    try {
      user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });

      if (user) {
        isMatch = await user.comparePassword(password);
      }
    } catch {
      throw new Error('Error finding user by username, email or comparing password');
    }
  }

  /**
   * Email validation
   */

  validator.isEmpty(usernameOrEmail)
    ? (errors.usernameOrEmail = 'Username or email is required')
    : !user
    ? (errors.usernameOrEmail = 'Username or email not found')
    : null;

  /**
   * Password validation
   */

  validator.isEmpty(password)
    ? (errors.password = 'Password is required')
    : !isMatch && !errors.usernameOrEmail
    ? (errors.password = 'Password incorrect')
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
