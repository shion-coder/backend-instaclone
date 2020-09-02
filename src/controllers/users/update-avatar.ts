import { Request, Response } from 'express';

import { UserProps } from '@model';
import { formatCloudinaryUrl } from '@utils/format-cloudinary-url';
import { postMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const updateAvatar = (req: Request, res: Response): Response => {
  const user = req.user as UserProps;

  /**
   * Validate file
   */

  if (!req.file) {
    return res.status(400).send({ error: postMessage.image.required });
  }

  /**
   * Format file in thumb with 200 width and 200 height, save it to user and send to client
   */

  user.avatar = formatCloudinaryUrl(req.file.path, { mode: 'thumb', width: 200, height: 200 });

  user.save();

  return res.send({ avatar: user.avatar });
};
