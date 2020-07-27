"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var _config_1 = require("@config");
exports.auth = function (req, res, next) {
    /**
     * Check whether token exist and start with Bearer
     */
    var authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).send({ error: 'Access denied. No valid token provided' });
    }
    var token = authorization.split('Bearer ')[1];
    try {
        /**
         * Decode token and set it to req.user
         */
        var decoded = jsonwebtoken_1.default.verify(token, _config_1.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (_a) {
        return res.status(400).send({ error: 'Invalid token' });
    }
};
//# sourceMappingURL=auth.js.map