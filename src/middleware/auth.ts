import passport from 'passport';

/* -------------------------------------------------------------------------- */

export const jwtAuth = passport.authenticate('jwt', { session: false });

export const googleAuth = passport.authenticate('google', { scope: ['profile'], prompt: 'select_account' });

export const facebookAuth = passport.authenticate('facebook', { failureRedirect: '/login' });
