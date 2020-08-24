import validator from 'validator';
import isEmpty from 'is-empty';

import { ValidatorProps, PostId } from '@types';
import { postMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validatePostId = ({ id }: PostId): ValidatorProps<Partial<PostId>> => {
  const errors: Partial<PostId> = {};

  /**
   * Id validation
   */

  validator.isEmpty(id)
    ? (errors.id = postMessage.id.required)
    : !validator.isMongoId(id)
    ? (errors.id = postMessage.id.invalid)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
