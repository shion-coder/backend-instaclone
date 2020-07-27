"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
var express_1 = require("express");
var auth_1 = require("./auth");
var users_1 = require("./users");
/* -------------------------------------------------------------------------- */
/**
 * API Router for /api
 */
exports.apiRouter = express_1.Router();
exports.apiRouter.use('/auth', auth_1.authRouter);
exports.apiRouter.use('/users', users_1.usersRouter);
//# sourceMappingURL=index.js.map