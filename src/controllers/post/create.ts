import { Request, Response } from 'express';

/* -------------------------------------------------------------------------- */

export const create = (req: Request, res: Response): Response | void => {
  const files = req.files as Express.Multer.File[];

  const images = files.map((file) => file.path);

  return res.send({ images });
};
