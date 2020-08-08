import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import cors from 'cors';
import compression from 'compression';
import 'express-async-errors';

import { Environment } from '@types';
import { error } from '@middleware';
import { request } from 'src/logger';
import { apiRouter } from '@routes/api';

/* -------------------------------------------------------------------------- */

const app = express();

/**
 *  Middleware
 */

app.use(passport.initialize());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.get('env') === Environment.DEVELOPMENT && app.use(request);

/**
 *  Routes
 */

app.use('/api', apiRouter);

/**
 * Error handling
 */

app.use(error);

export default app;
