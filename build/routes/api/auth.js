"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = require("express");
var _middleware_1 = require("@middleware");
var auth_1 = require("@controllers/auth");
/* -------------------------------------------------------------------------- */
exports.authRouter = express_1.Router();
/**
 * @route   POST /api/auth/register
 * @desc    Register & return JWT token
 * @access  Public
 */
exports.authRouter.route('/register').post(auth_1.register);
/**
 * @route   POST /api/auth/login
 * @desc    Login & return JWT token
 * @access  Public
 */
exports.authRouter.route('/login').post(auth_1.login);
/**
 * @route   Get /api/auth/me
 * @desc    Verify auth & return user data
 * @access  Private
 */
exports.authRouter.route('/me').get(_middleware_1.auth, auth_1.me);
//# sourceMappingURL=auth.js.map