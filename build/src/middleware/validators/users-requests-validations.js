"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putValidation = exports.createValidation = void 0;
exports.createValidation = {
    firstName: {
        isString: true,
        notEmpty: true,
        errorMessage: 'First name must be present.'
    },
    lastName: {
        isString: true,
        notEmpty: true,
        errorMessage: 'Last name must be present.'
    },
    email: {
        isEmail: true,
        errorMessage: 'Email field must be an actual email address.'
    },
    password: {
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars'
        }
    }
};
exports.putValidation = {
    firstName: {
        optional: true,
        notEmpty: true,
        isString: true
    },
    lastName: {
        optional: true,
        notEmpty: true,
        isString: true
    },
    email: {
        optional: true,
        isEmail: true,
        errorMessage: 'Email field must be an actual email address.'
    },
    password: {
        optional: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars'
        }
    }
};
