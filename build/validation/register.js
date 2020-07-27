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
exports.validateRegister = void 0;
var validator_1 = __importDefault(require("validator"));
var is_empty_1 = __importDefault(require("is-empty"));
var _model_1 = require("@model");
/* -------------------------------------------------------------------------- */
exports.validateRegister = function (_a) {
    var firstName = _a.firstName, lastName = _a.lastName, username = _a.username, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword;
    return __awaiter(void 0, void 0, void 0, function () {
        var errors, existingUsername, existingEmail, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    errors = {};
                    existingUsername = null;
                    existingEmail = null;
                    if (!!validator_1.default.isEmpty(username)) return [3 /*break*/, 4];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, _model_1.User.findOne({ username: username })];
                case 2:
                    existingUsername = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _b = _d.sent();
                    throw new Error('Error finding user by username');
                case 4:
                    if (!(!validator_1.default.isEmpty(email) && validator_1.default.isEmail(email))) return [3 /*break*/, 8];
                    _d.label = 5;
                case 5:
                    _d.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, _model_1.User.findOne({ email: email })];
                case 6:
                    existingEmail = _d.sent();
                    return [3 /*break*/, 8];
                case 7:
                    _c = _d.sent();
                    throw new Error('Error finding user by email');
                case 8:
                    /**
                     * First name validation
                     */
                    validator_1.default.isEmpty(firstName)
                        ? (errors.firstName = 'First Name is required')
                        : !validator_1.default.isLength(firstName, { max: 30 })
                            ? (errors.firstName = 'First Name must be less than 30 characters')
                            : null;
                    /**
                     * Last name validation
                     */
                    lastName && !validator_1.default.isLength(lastName, { max: 30 })
                        ? (errors.lastName = 'Last Name must be less than 30 characters')
                        : null;
                    /**
                     * Username validation
                     */
                    validator_1.default.isEmpty(username)
                        ? (errors.username = 'Username is required')
                        : !validator_1.default.isLength(username, { max: 30 })
                            ? (errors.username = 'Username must be less than 30 characters')
                            : existingUsername
                                ? (errors.username = 'This username is already taken')
                                : null;
                    /**
                     * Email validation
                     */
                    validator_1.default.isEmpty(email)
                        ? (errors.email = 'Email is required')
                        : !validator_1.default.isEmail(email)
                            ? (errors.email = 'Invalid email format')
                            : existingEmail
                                ? (errors.email = 'This email is already taken')
                                : null;
                    /**
                     * Password validation
                     */
                    validator_1.default.isEmpty(password)
                        ? (errors.password = 'Password is required')
                        : !validator_1.default.isLength(password, { min: 6 })
                            ? (errors.password = 'Password must be at least 6 characters')
                            : null;
                    /**
                     * Confirm password validation
                     */
                    validator_1.default.isEmpty(confirmPassword)
                        ? (errors.confirmPassword = 'Confirm password is required')
                        : !validator_1.default.equals(password, confirmPassword)
                            ? (errors.confirmPassword = 'Password and confirm password do not match')
                            : null;
                    return [2 /*return*/, {
                            errors: errors,
                            isValid: is_empty_1.default(errors),
                        }];
            }
        });
    });
};
//# sourceMappingURL=register.js.map