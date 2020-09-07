import { Request, Response } from 'express';

import { formatCloudinaryUrl, CLOUDINARY_MODE } from '@utils';
import { dataMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const updateAvatar = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;

  if (!user) {
    return res.send({ error: dataMessage.noUser });
  }

  /**
   * Validate file
   */

  if (!req.file) {
    return res.status(400).send({ error: dataMessage.image.required });
  }

  /**
   * Format file in thumb mode with 200 width, 200 height then update user avatar and send new avatar to client
   */

  const avatar = formatCloudinaryUrl(req.file.path, { mode: CLOUDINARY_MODE.THUMB, width: 200, height: 200 });

  user.avatar = avatar;

  await user.save();

  return res.send({ avatar });
};
