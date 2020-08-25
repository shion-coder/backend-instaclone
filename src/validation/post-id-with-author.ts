import validator from 'validator';
import isEmpty from 'is-empty';

import { Post, PostProps } from '@model';
import { ValidatorProps, PostId } from '@types';
import { errorMessage, postMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validatePostIdWithAuthor = async ({ id, author }: PostId): Promise<ValidatorProps<Partial<PostId>>> => {
  const errors: Partial<PostId> = {};

  let postFound: PostProps | null = null;

  /**
   * Find existing email and compare password
   */

  if (!validator.isEmpty(id) && validator.isMongoId(id)) {
    try {
      postFound = await Post.findOne({ _id: id, author });
    } catch {
      throw new Error(errorMessage.findingId);
    }
  }

  /**
   * Id validation
   */

  validator.isEmpty(id)
    ? (errors.id = postMessage.id.required)
    : !validator.isMongoId(id)
    ? (errors.id = postMessage.id.invalid)
    : !postFound
    ? (errors.id = postMessage.id.associated)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
