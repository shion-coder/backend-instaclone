import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FB_CLIENT_ID, FB_CLIENT_SECRET } from './env';

/* -------------------------------------------------------------------------- */

/**
 * Oauth providers and set function get callback url for each provider
 */

const providers = ['google', 'facebook'];

const callbacks = providers.map((provider) => {
  return `/api/auth/${provider}/callback`;
});

const [googleCallbackURL, facebookCallbackURL] = callbacks;

/**
 * Providers config
 */

export const GOOGLE_CONFIG = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: googleCallbackURL,
};

export const FACEBOOK_CONFIG = {
  clientID: FB_CLIENT_ID,
  clientSecret: FB_CLIENT_SECRET,
  callbackURL: facebookCallbackURL,
  profileFields: ['id', 'name', 'emails', 'picture.width(250)'],
};
