"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _config_1 = require("@config");
var database_1 = __importDefault(require("src/database"));
var app_1 = __importDefault(require("src/app"));
var logger_1 = require("src/logger");
/* -------------------------------------------------------------------------- */
/**
 * Connect database
 */
database_1.default();
/**
 * Server
 */
app_1.default.listen(_config_1.PORT, function (err) {
    if (err) {
        return logger_1.logger.error("Express - Error listening on port " + _config_1.PORT + " -", err);
    }
    return logger_1.logger.info("Express - Listening on port " + _config_1.PORT);
});
//# sourceMappingURL=index.js.map