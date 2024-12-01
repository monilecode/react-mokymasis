import express from 'express';
import { register, login, logout } from '../controllers/AuthController';

const AuthRoutes = express.Router();

AuthRoutes.post('/register', register);
AuthRoutes.post('/login', login);
AuthRoutes.post('/logout', logout);

export { AuthRoutes };
