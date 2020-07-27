export const PORT: number = Number(process.env.PORT) || 4000;

export const MONGODB_URI: string = process.env.MONGODB_URI || '';

export const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';

export const JWT_EXPIRE: string = process.env.JWT_EXPIRE || '1h';
