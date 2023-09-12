"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    if ((req.method !== 'GET' && req.method !== 'DELETE') && !req.is('application/json')) {
        return res.status(415).send({ message: 'Invalid Content-Type header' });
    }
    next();
};
