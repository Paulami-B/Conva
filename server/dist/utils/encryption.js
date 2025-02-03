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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.generateToken = exports.encryptPassword = exports.maxAge = void 0;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.maxAge = 3 * 24 * 60 * 60 * 1000;
function encryptPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        return hashedPassword;
    });
}
exports.encryptPassword = encryptPassword;
function generateToken(userId, username) {
    return jwt.sign({ userId, username }, process.env.JWT_PASSWORD, { expiresIn: exports.maxAge });
}
exports.generateToken = generateToken;
function checkPassword(password, hashedPassword) {
    const validPassword = bcrypt.compareSync(password, hashedPassword);
    return validPassword;
}
exports.checkPassword = checkPassword;
