"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const AuthRoutes = express_1.default.Router();
exports.AuthRoutes = AuthRoutes;
AuthRoutes.post('/register', AuthController_1.register);
AuthRoutes.post('/login', AuthController_1.login);
AuthRoutes.post('/logout', AuthController_1.logout);
