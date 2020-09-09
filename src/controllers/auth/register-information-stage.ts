import { Request, Response } from 'express';

import { validateRegisterInformationStage } from '@validation';

/* -------------------------------------------------------------------------- */

export const registerInformationStage = async (req: Request, res: Response): Promise<Response | void> => {
  /**
   * Validate register information props
   */

  const { errors, isValid } = await validateRegisterInformationStage(req.body);

  if (!isValid) {
    return res.status(400).send({ errors });
  }

  return res.send();
};
