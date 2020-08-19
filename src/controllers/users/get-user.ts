import { Request, Response } from 'express';

import { User } from '@model';
import { userMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const { username } = req.params;

  const user = await User.findOne({ username })
    .select('-__v -password')
    .populate({ path: 'posts', select: 'image thumbnail caption filter' });

  if (!user) {
    return res.status(404).send({ error: userMessage.username.notFound });
  }

  return res.send({ user });
};
