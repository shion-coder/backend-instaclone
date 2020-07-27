"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.logger = void 0;
var winston_1 = require("winston");
var express_winston_1 = __importDefault(require("express-winston"));
var path_1 = __importDefault(require("path"));
require("winston-daily-rotate-file");
/* -------------------------------------------------------------------------- */
/**
 * Winston config
 */
var loggerFormat = winston_1.format.combine(winston_1.format.printf(function (info) {
    var timestamp = "\u001B[34m" + new Date(Date.now()).toUTCString() + "\u001B[39m";
    var level = info.level === 'error'
        ? "\u001B[31m" + info.level.toUpperCase() + "\u001B[0m"
        : info.level === 'info'
            ? "\u001B[32m" + info.level.toUpperCase() + "\u001B[0m"
            : info.level === 'warn'
                ? "\u001B[33m" + info.level.toUpperCase() + "\u001B[0m"
                : info.level.toUpperCase();
    var message = info.level === 'error'
        ? "\u001B[31m" + info.message + "\u001B[0m"
        : info.level === 'info'
            ? "\u001B[32m" + info.message + "\u001B[0m"
            : info.level === 'warn'
                ? "\u001B[33m" + info.message + "\u001B[0m"
                : info.level.toUpperCase();
    var result = timestamp + " | " + level + " | " + message;
    return result;
}));
/**
 * Winston logger
 */
exports.logger = winston_1.createLogger({
    format: loggerFormat,
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.DailyRotateFile({
            filename: path_1.default.join(__dirname, 'logs', 'errors-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
        }),
    ],
    exceptionHandlers: [
        new winston_1.transports.Console(),
        new winston_1.transports.DailyRotateFile({
            filename: path_1.default.join(__dirname, 'logs', 'exceptions-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
        }),
    ],
});
exports.request = express_winston_1.default.logger({
    format: loggerFormat,
    transports: [new winston_1.transports.Console()],
});
/**
 * Handling unhandled rejection by throw it to exception and from there winston would pick up an exception and log it.
 */
process.on('unhandledRejection', function (ex) {
    throw ex;
});
//# sourceMappingURL=logger.js.map