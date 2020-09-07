/**
 * Custom and extend type declaration
 */

declare global {
  namespace Express {
    export interface Request {
      user?: import('../model/User').UserProps;
    }
    export interface Session {
      socketId: string;
    }
  }

  namespace SocketIO {
    export interface Socket {
      user?: import('../model/User').TokenDecodeProps;
    }
  }
}

export * from './environment';

export * from './app';

export * from './model';

export * from './passport';

export * from './socket';

export * from './validation';

export * from './notification';
