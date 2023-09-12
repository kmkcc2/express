"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    email: {
        isEmail: true,
        errorMessage: 'Invalid email'
    },
    password: {
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars'
        }
    }
};
