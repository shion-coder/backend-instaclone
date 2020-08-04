import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { TokenPayloadProps } from '@model';
import { AuthRequestProps } from '@types';
import { JWT_SECRET } from '@config';
import { errorMessage } from '@messages';

/* -------------------------------------------------------------------------- */

export const auth = (req: AuthRequestProps, res: Response, next: NextFunction): Response | void => {
  /**
   * Check whether  exist and start with Bearer
   */

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).send({ error: errorMessage.noToken });
  }

  const token = authorization.split('Bearer ')[1];

  try {
    /**
     * Decode token and set it to req.user
     */

    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayloadProps;

    req.user = decoded;
    next();
  } catch {
    return res.status(401).send({ error: errorMessage.invalidToken });
  }
};
