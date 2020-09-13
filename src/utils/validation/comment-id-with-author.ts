import validator from 'validator';
import isEmpty from 'is-empty';

import { Comment, CommentProps } from '@model';
import { ValidatorProps, PostId } from '@types';
import { errorMessage, dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const validateCommentIdWithAuthor = async ({
  id = '',
  author,
}: PostId): Promise<ValidatorProps<Partial<PostId>>> => {
  const errors: Partial<PostId> = {};

  let commentFound: CommentProps | null = null;
  let owner = false;

  /**
   * Find comment with id
   */

  if (!validator.isEmpty(id) && validator.isMongoId(id)) {
    try {
      commentFound = await Comment.findById(id);
      owner = commentFound?.author.toString() === author?.toString();
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
    : !commentFound
    ? (errors.id = dataMessage.noComment)
    : !owner
    ? (errors.id = dataMessage.noCommentDeletePermission)
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
