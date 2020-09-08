import { Request, Response } from 'express';

import { UserProps, User, USER_PATH } from '@model';
import { selectPostInfo, selectSaved } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getSaved = async (req: Request, res: Response): Promise<Response> => {
  const { username, offset }: { username?: UserProps['username']; offset?: string } = req.params;

  /**
   * Limit number of saved posts send to client each request
   */

  const limit = 9;

  /**
   * Find user and saved posts of user by username with offset and limit
   */

  const userFound = await User.findOne({ username })
    .select(selectSaved)
    .populate({
      path: USER_PATH.SAVED,
      select: selectPostInfo,
      options: { skip: Number(offset), limit },
    })
    .lean();

  if (!userFound) {
    return res.status(404).send({ error: dataMessage.username.notFound });
  }

  const saved = userFound.saved;

  /**
   * If saved posts send reach limit number then send saved posts with next number to use in next query
   */

  if (saved.length === limit) {
    return res.send({ posts: saved, next: Number(offset) + limit });
  }

  return res.send({ posts: saved });
};
