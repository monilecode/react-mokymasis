"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).send({ error: 'Not authenticated' });
        return;
    }
    try {
        const token = authHeader.split(' ')[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        req.currentUser = payload;
    }
    catch (err) {
        res.status(401).send({ error: 'Not authenticated' });
        return;
    }
    next();
};
exports.AuthMiddleware = AuthMiddleware;
