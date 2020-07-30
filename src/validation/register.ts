import validator from 'validator';
import isEmpty from 'is-empty';

import { User, UserProps } from '@model';

import { ValidatorProps, RegisterDataProps, RegisterErrorProps } from '@types';

/* -------------------------------------------------------------------------- */

export const validateRegister = async ({
  firstName,
  lastName,
  username,
  email,
  password,
  confirmPassword,
}: RegisterDataProps): Promise<ValidatorProps<RegisterErrorProps>> => {
  const errors = {} as RegisterErrorProps;

  let existingUsername: UserProps | null = null;
  let existingEmail: UserProps | null = null;

  /**
   * Find existing username & email
   */

  if (!validator.isEmpty(username)) {
    try {
      existingUsername = await User.findOne({ username });
    } catch {
      throw new Error('Error finding user by username');
    }
  }

  if (!validator.isEmpty(email) && validator.isEmail(email)) {
    try {
      existingEmail = await User.findOne({ email });
    } catch {
      throw new Error('Error finding user by email');
    }
  }

  /**
   * First name validation
   */

  validator.isEmpty(firstName)
    ? (errors.firstName = 'First Name is required')
    : !validator.isLength(firstName, { max: 30 })
    ? (errors.firstName = 'First Name must be less than 30 characters')
    : null;

  /**
   * Last name validation
   */

  lastName && !validator.isLength(lastName, { max: 30 })
    ? (errors.lastName = 'Last Name must be less than 30 characters')
    : null;

  /**
   * Username validation
   */

  validator.isEmpty(username)
    ? (errors.username = 'Username is required')
    : !validator.isLength(username, { max: 30 })
    ? (errors.username = 'Username must be less than 30 characters')
    : existingUsername
    ? (errors.username = 'This username is already taken')
    : null;

  /**
   * Email validation
   */

  validator.isEmpty(email)
    ? (errors.email = 'Email is required')
    : !validator.isEmail(email)
    ? (errors.email = 'Invalid email format')
    : existingEmail
    ? (errors.email = 'This email is already taken')
    : null;

  /**
   * Password validation
   */

  validator.isEmpty(password)
    ? (errors.password = 'Password is required')
    : !validator.isLength(password, { min: 6 })
    ? (errors.password = 'Password must be at least 6 characters')
    : null;

  /**
   * Confirm password validation
   */

  validator.isEmpty(confirmPassword)
    ? (errors.confirmPassword = 'Confirm password is required')
    : !validator.equals(password, confirmPassword)
    ? (errors.confirmPassword = 'Password and confirm password do not match')
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
