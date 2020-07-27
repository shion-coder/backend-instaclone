import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { ITokenPayload } from '@model';
import { JWT_SECRET } from '@config';

/* -------------------------------------------------------------------------- */

export interface IAuthRequest extends Request {
  user?: ITokenPayload;
}

export const auth = (req: IAuthRequest, res: Response, next: NextFunction): Response | void => {
  /**
   * Check whether token exist and start with Bearer
   */

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).send({ error: 'Access denied. No valid token provided' });
  }

  const token = authorization.split('Bearer ')[1];

  try {
    /**
     * Decode token and set it to req.user
     */

    const decoded = jwt.verify(token, JWT_SECRET) as ITokenPayload;

    req.user = decoded;
    next();
  } catch {
    return res.status(400).send({ error: 'Invalid token' });
  }
};
