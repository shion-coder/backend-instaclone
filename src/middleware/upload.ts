import { Request, Response, NextFunction } from 'express';

import { multerUpload } from '@multer';
import { errorMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const upload = (req: Request, res: Response, next: NextFunction): void => {
  multerUpload(req, res, (err: unknown) => {
    if (err) {
      return res.status(400).send({ error: errorMessage.uploadingImages });
    }

    next();
  });
};
