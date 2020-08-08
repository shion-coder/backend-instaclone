import { FB_CLIENT_ID, FB_CLIENT_SECRET } from './env';

/* -------------------------------------------------------------------------- */

const providers = ['facebook'];

const callbacks = providers.map((provider) => {
  return process.env.NODE_ENV === 'production' ? '' : `auth/${provider}/callback`;
});

const [facebookURL] = callbacks;

export const FACEBOOK_CONFIG = {
  clientID: FB_CLIENT_ID,
  clientSecret: FB_CLIENT_SECRET,
  callbackURL: facebookURL,
};
