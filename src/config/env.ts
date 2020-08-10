export const PORT: number = Number(process.env.PORT) || 4000;

export const MONGODB_URI: string = process.env.MONGODB_URI || '';

export const SESSION_SECRET: string = process.env.JWT_SECRET || 'meow';

export const JWT_SECRET: string = process.env.JWT_SECRET || 'meow';

export const JWT_EXPIRE: string = process.env.JWT_EXPIRE || '1h';

export const MAIL_USER: string = process.env.MAIL_USER || '';

export const MAIL_PASS: string = process.env.MAIL_PASS || '';

export const CLIENT_ORIGIN: string = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

export const FB_CLIENT_ID: string = process.env.FB_CLIENT_ID || '';

export const FB_CLIENT_SECRET: string = process.env.FB_CLIENT_SECRET || '';

export const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || '';

export const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || '';
