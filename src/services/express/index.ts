import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import compression from 'compression';
import 'express-async-errors';

import { Environment } from '@types';
import { SESSION_SECRET, CLIENT_ORIGIN } from '@config';
import { error } from '@middleware';
import { apiRouter } from '@routes/api';
import { request } from '@logger';

/* -------------------------------------------------------------------------- */

const app = express();

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
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.get('env') === Environment.DEVELOPMENT && app.use(request);

/**
 *  Routes
 */

// Catch a start up request so that a sleepy Heroku instance can be responsive as soon as possible
app.get('/wake-up', (req, res) => res.send('Hello'));

app.use('/api', apiRouter);

/**
 * Error handling
 */

app.use(error);

export default app;
