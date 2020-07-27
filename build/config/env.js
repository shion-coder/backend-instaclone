"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRE = exports.JWT_SECRET = exports.MONGODB_URI = exports.PORT = void 0;
exports.PORT = Number(process.env.PORT) || 4000;
exports.MONGODB_URI = process.env.MONGODB_URI || '';
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_EXPIRE = process.env.JWT_EXPIRE || '1h';
//# sourceMappingURL=env.js.map