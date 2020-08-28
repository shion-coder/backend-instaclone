export const PORT = Number(process.env.PORT) || 4000;

export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

export const MONGODB_URI = process.env.MONGODB_URI || '';

export const SESSION_SECRET = process.env.JWT_SECRET || 'meow';

export const JWT_SECRET = process.env.JWT_SECRET || 'meow';

export const JWT_EXPIRE = process.env.JWT_EXPIRE || '8h';

export const MAIL_USER = process.env.MAIL_USER || '';

export const MAIL_PASS = process.env.MAIL_PASS || '';

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

export const FB_CLIENT_ID = process.env.FB_CLIENT_ID || '';

export const FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET || '';
