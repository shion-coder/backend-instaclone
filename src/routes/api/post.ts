import { Router } from 'express';

import { jwtAuth, upload } from '@middleware';
import { create } from '@controllers/post';

/* -------------------------------------------------------------------------- */

export const postRouter = Router();

/**
 * @route   POST /api/post
 * @desc    Create post
 * @access  Private
 */
postRouter.route('/').post(jwtAuth, upload, create);
