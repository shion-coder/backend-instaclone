import validator from 'validator';
import isEmpty from 'is-empty';

import { Post, PostProps } from '@model';
import { ValidatorProps, PostId } from '@types';
import { errorMessage, dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validatePostIdWithAuthor = async ({
  id = '',
  author,
}: PostId): Promise<ValidatorProps<Partial<PostId>>> => {
  const errors: Partial<PostId> = {};

  let postFound: PostProps | null = null;
  let owner = false;

  /**
   * Find post with id
   */

  if (!validator.isEmpty(id) && validator.isMongoId(id)) {
    try {
      postFound = await Post.findById(id);
      owner = postFound?.author.toString() === author?.toString();
    } catch {
      throw new Error(errorMessage.findingId);
    }
  }

  /**
   * Id validation
   */

  validator.isEmpty(id)
    ? (errors.id = dataMessage.id.required)
    : !validator.isMongoId(id)
    ? (errors.id = dataMessage.id.invalid)
    : !postFound
    ? (errors.id = dataMessage.noPost)
    : !owner
    ? (errors.id = dataMessage.noPostDeletePermission)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
