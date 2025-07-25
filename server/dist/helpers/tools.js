"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketCode = exports.padWithLeadingZeros = exports.generateRandomString = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateRandomString = (length) => {
    return crypto_1.default.randomBytes(length).toString('hex').toUpperCase();
};
exports.generateRandomString = generateRandomString;
const padWithLeadingZeros = (num, totalLength) => {
    return String(num).padStart(totalLength, '0');
};
exports.padWithLeadingZeros = padWithLeadingZeros;
const ticketCode = (ticketType) => {
    switch (ticketType) {
        case 'BUG_FIXED':
            return 'BUG';
        case 'FEATURE_REQUEST':
            return 'FR';
        default:
            return 'OT';
    }
};
exports.ticketCode = ticketCode;
