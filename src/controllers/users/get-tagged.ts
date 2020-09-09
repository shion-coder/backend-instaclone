import { Request, Response } from 'express';

import { UserProps, User, USER_PATH } from '@model';
import { selectPostInfo, selectTagged } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getTagged = async (req: Request, res: Response): Promise<Response> => {
  const { username, offset }: { username?: UserProps['username']; offset?: string } = req.params;

  /**
   * Limit number of tagged posts send to client each request
   */

  const limit = 9;

  /**
   * Find user and tagged posts of user by username with offset and limit
   */

  const userFound = await User.findOne({ username })
    .select(selectTagged)
    .populate({
      path: USER_PATH.TAGGED,
      select: selectPostInfo,
      options: { skip: Number(offset), limit },
    })
    .lean();

  if (!userFound) {
    return res.status(404).send({ error: dataMessage.username.notFound });
  }

  const tagged = userFound.tagged;

  /**
   * If tagged posts send reach limit number then send tagged posts with next number to use in next query
   */

  if (tagged.length === limit) {
    return res.send({ posts: tagged, next: Number(offset) + limit });
  }

  return res.send({ posts: tagged });
};
