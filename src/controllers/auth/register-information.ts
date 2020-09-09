import { Request, Response } from 'express';

import { validateRegisterInformation } from '@validation';

/* -------------------------------------------------------------------------- */

export const registerInformation = async (req: Request, res: Response): Promise<Response | void> => {
  /**
   * Validate register information props
   */

  const { errors, isValid } = await validateRegisterInformation(req.body);

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  return res.send();
};
