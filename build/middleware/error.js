"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
var logger_1 = require("src/logger");
/* -------------------------------------------------------------------------- */
exports.error = function (err, _req, res, next) {
    logger_1.logger.error(err.message || 'Internal Server Error');
    res.status(500).send({ error: err.message || 'Internal Server Error' });
    next(err);
};
//# sourceMappingURL=error.js.map