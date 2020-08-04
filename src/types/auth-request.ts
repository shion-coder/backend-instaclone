import { Request } from 'express';
import { TokenPayloadProps } from '@model';

/* -------------------------------------------------------------------------- */

export type AuthRequestProps = Request & {
  user?: TokenPayloadProps;
};
