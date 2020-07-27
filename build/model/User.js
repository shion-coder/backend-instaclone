"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var _config_1 = require("@config");
/**
 * User schema
 */
var userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        maxlength: [30, 'First Name must be less than 30 characters'],
    },
    lastName: {
        type: String,
        maxlength: [30, 'Last Name must be less than 30 characters'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        maxlength: [30, 'Username must be less than 30 characters'],
        lowercase: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
/**
 * Hash password before save user
 */
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(this.password && this.isModified('password'))) return [3 /*break*/, 5];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, bcryptjs_1.genSalt(10)];
                case 2:
                    salt = _c.sent();
                    _a = this;
                    return [4 /*yield*/, bcryptjs_1.hash(this.password, salt)];
                case 3:
                    _a.password = _c.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _b = _c.sent();
                    throw new Error('Error hashing user password');
                case 5:
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
/**
 * Get full name
 */
userSchema.virtual('fullName').get(function () {
    if (!this.lastName) {
        return this.firstName;
    }
    return this.firstName + " " + this.lastName;
});
/**
 * Compare password
 */
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function () {
        var isMatch, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bcryptjs_1.compare(password, this.password)];
                case 1:
                    isMatch = _b.sent();
                    return [2 /*return*/, isMatch];
                case 2:
                    _a = _b.sent();
                    throw new Error('Error comparing password');
                case 3: return [2 /*return*/];
            }
        });
    });
};
/**
 * Get token
 */
userSchema.methods.generateAuthToken = function () {
    var payload = {
        id: this.id,
        username: this.username,
        email: this.email,
        isAdmin: this.isAdmin,
    };
    return jsonwebtoken_1.default.sign(payload, _config_1.JWT_SECRET, { expiresIn: _config_1.JWT_EXPIRE });
};
exports.User = mongoose_1.model('User', userSchema);
//# sourceMappingURL=User.js.map