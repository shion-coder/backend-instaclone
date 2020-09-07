import passport from 'passport';

import { PASSPORT } from '@types';

/* -------------------------------------------------------------------------- */

/**
 * Passport authenticate
 */

export const jwtAuth = passport.authenticate(PASSPORT.JWT, { session: false });

export const googleAuth = passport.authenticate(PASSPORT.GOOGLE, {
  scope: ['profile', 'email'],
  prompt: 'select_account',
  session: false,
});

export const facebookAuth = passport.authenticate(PASSPORT.FACEBOOK, { session: false });
