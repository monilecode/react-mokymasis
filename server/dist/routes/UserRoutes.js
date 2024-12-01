"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express = require('express');
const { register, login } = require('../controllers/AuthController');
const AuthRoutes = express.Router();
exports.AuthRoutes = AuthRoutes;
AuthRoutes.post('/register', register);
AuthRoutes.post('/login', login);
