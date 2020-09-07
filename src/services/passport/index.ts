import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import { User, TokenDecodeProps } from '@model';
import { JWT_SECRET, FACEBOOK_CONFIG, GOOGLE_CONFIG } from '@config';

/* -------------------------------------------------------------------------- */

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

export const passportInit = (): void => {
  /**
   * Token
   */

  passport.use(
    new JwtStrategy(options, async (payload: TokenDecodeProps, done) => {
      try {
        const user = await User.findById(payload.id);

        if (user) {
          return done(null, user);
        }

        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }),
  );

  /**
   * Google Strategy
   */

  passport.use(
    new GoogleStrategy(GOOGLE_CONFIG, async (_accessToken, _refreshToken, profile, done) => {
      try {
        if (profile.emails) {
          const user = await User.findOne({ $or: [{ googleId: profile.id }, { email: profile.emails[0].value }] });

          if (user) {
            return done(undefined, user);
          }

          /**
           * Create new user with google info
           */

          const newUser = new User({
            googleId: profile.id,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName || '',
            email: profile.emails[0].value,
            confirmed: true,
          });

          await newUser.save();

          return done(undefined, newUser);
        }

        return done(undefined, false);
      } catch (error) {
        return done(error, false);
      }
    }),
  );

  /**
   * Facebook Strategy
   * TODO:
   */

  passport.use(
    new FacebookStrategy(FACEBOOK_CONFIG, async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ facebookId: profile.id });

        if (user) {
          return done(null, user);
        }

        return done(null, profile);
      } catch (error) {
        return done(error, false);
      }
    }),
  );
};
