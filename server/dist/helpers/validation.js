"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patternValidation = exports.errorSetter = void 0;
const errorSetter = (err) => {
    if (err?.message.slice(0, 6) === 'Error:') {
        throw new Error(err.message);
    }
    else {
        throw new Error('Error: Internal server error');
    }
};
exports.errorSetter = errorSetter;
exports.patternValidation = {
    password: () => new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)
};
