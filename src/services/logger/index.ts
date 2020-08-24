import { createLogger, format, transports } from 'winston';
import expressWinston from 'express-winston';
import path from 'path';
import 'winston-daily-rotate-file';

/* -------------------------------------------------------------------------- */

/**
 * Winston config
 */

const loggerFormat = format.combine(
  format.printf((info) => {
    const timestamp = `\x1b[34m${new Date(Date.now()).toUTCString()}\x1B[39m`;

    const level =
      info.level === 'error'
        ? `\x1B[31m${info.level.toUpperCase()}\x1B[0m`
        : info.level === 'info'
        ? `\x1B[32m${info.level.toUpperCase()}\x1B[0m`
        : info.level === 'warn'
        ? `\x1B[33m${info.level.toUpperCase()}\x1B[0m`
        : info.level.toUpperCase();

    const message =
      info.level === 'error'
        ? `\x1B[31m${info.message}\x1B[0m`
        : info.level === 'info'
        ? `\x1B[32m${info.message}\x1B[0m`
        : info.level === 'warn'
        ? `\x1B[33m${info.message}\x1B[0m`
        : info.level.toUpperCase();

    const result = `${timestamp} | ${level} | ${message}`;

    return result;
  }),
);

/**
 * Winston logger
 */

export const logger = createLogger({
  format: loggerFormat,
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: path.join(__dirname, 'logs', 'errors-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
    }),
  ],
  exceptionHandlers: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: path.join(__dirname, 'logs', 'exceptions-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
    }),
  ],
  exitOnError: false,
});

export const request = expressWinston.logger({
  format: loggerFormat,
  transports: [new transports.Console()],
});

/**
 * Handling unhandled rejection by throw it to exception and from there winston would pick up an exception and log it.
 */

process.on('unhandledRejection', (ex) => {
  throw ex;
});
