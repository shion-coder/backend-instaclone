import { FB_CLIENT_ID, FB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './env';

/* -------------------------------------------------------------------------- */

const providers = ['google', 'facebook'];

const callbacks = providers.map((provider) => {
  return process.env.NODE_ENV === 'production' ? '' : `/api/auth/${provider}/callback`;
});

const [googleURL, facebookURL] = callbacks;

export const GOOGLE_CONFIG = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: googleURL,
};

export const FACEBOOK_CONFIG = {
  clientID: FB_CLIENT_ID,
  clientSecret: FB_CLIENT_SECRET,
  callbackURL: facebookURL,
  profileFields: ['id', 'name', 'emails', 'picture.width(250)'],
};
