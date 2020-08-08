import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { User, TokenPayloadProps } from '@model';
import { JWT_SECRET } from '@config';
// import { Strategy as FacebookStrategy } from 'passport-facebook';

// import { FACEBOOK_CONFIG } from '@config';
// import { User } from '@model';

/* -------------------------------------------------------------------------- */

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

export const passportInit = (): void => {
  passport.use(
    new JwtStrategy(options, async (payload: TokenPayloadProps, done) => {
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

  // passport.serializeUser((user, cb) => {
  //   cb(null, user);
  // });
  // passport.deserializeUser((user, cb) => {
  //   cb(null, user);
  // });
  // passport.use(
  //   new FacebookStrategy(FACEBOOK_CONFIG, async (accessToken, refreshToken, profile, cb) => {
  //     const existingUser = await User.findOne({ facebookId: profile.id });
  //     if (existingUser) {
  //       return cb(null, existingUser);
  //     }
  //     cb(null, profile);
  //   }),
  // );
};
