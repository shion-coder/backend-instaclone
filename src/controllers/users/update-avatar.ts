import { Request, Response } from 'express';

import { UserProps } from '@model';
import { formatCloudinaryUrl } from '@utils/format-cloudinary-url';
import { postMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const updateAvatar = (req: Request, res: Response): Response => {
  const user = req.user as UserProps;

  if (!req.file) {
    return res.status(400).send({ error: postMessage.image.required });
  }

  user.avatar = formatCloudinaryUrl(req.file.path, { mode: 'thumb', width: 200, height: 200 });

  user.save();

  return res.send({ user });
};
