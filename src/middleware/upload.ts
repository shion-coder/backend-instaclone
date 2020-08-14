import { Request, Response, NextFunction } from 'express';

import { multerUploadSingle, multerUploadMulti } from '@multer';
import { errorMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const uploadSingle = (req: Request, res: Response, next: NextFunction): void => {
  multerUploadSingle(req, res, (err: unknown) => {
    if (err) {
      return res.status(400).send({ error: errorMessage.uploadingImages });
    }

    next();
  });
};

export const uploadMulti = (req: Request, res: Response, next: NextFunction): void => {
  multerUploadMulti(req, res, (err: unknown) => {
    if (err) {
      return res.status(400).send({ error: errorMessage.uploadingImages });
    }

    next();
  });
};
