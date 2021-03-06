import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import compression from 'compression';

import 'express-async-errors';

import { APP_VAlUES, ENVIRONMENT } from '@types';
import { SESSION_SECRET } from '@config';
import { error } from '@middleware';
import { apiRouter } from '@api';
import { request } from '@logger';

/* -------------------------------------------------------------------------- */

export const app = express();

/**
 *  Middleware
 */

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.get(APP_VAlUES.ENV) === ENVIRONMENT.DEVELOPMENT && app.use(request);

/**
 *  Routes
 */

app.use('/api', apiRouter);

app.use('/', (_req, res) => res.send());

/**
 * Error handling
 */

app.use(error);
