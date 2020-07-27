"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var compression_1 = __importDefault(require("compression"));
require("express-async-errors");
var _types_1 = require("@types");
var _middleware_1 = require("@middleware");
var logger_1 = require("src/logger");
var api_1 = require("@routes/api");
/* -------------------------------------------------------------------------- */
var app = express_1.default();
/**
 *  Middleware
 */
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(compression_1.default());
app.get('env') === _types_1.Environment.DEVELOPMENT && app.use(logger_1.request);
/**
 *  Routes
 */
app.use('/api', api_1.apiRouter);
/**
 * Error handling
 */
app.use(_middleware_1.error);
exports.default = app;
//# sourceMappingURL=app.js.map