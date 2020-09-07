import validator from 'validator';
import isEmpty from 'is-empty';

import { ValidatorProps, PostId } from '@types';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validatePostId = ({ id = '' }: PostId): ValidatorProps<Partial<PostId>> => {
  const errors: Partial<PostId> = {};

  /**
   * Id validation
   */

  validator.isEmpty(id)
    ? (errors.id = dataMessage.id.required)
    : !validator.isMongoId(id)
    ? (errors.id = dataMessage.id.invalid)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
