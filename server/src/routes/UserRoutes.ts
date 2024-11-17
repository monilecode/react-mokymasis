const express = require('express');
const { register, login } = require('../controllers/AuthController');

const AuthRoutes = express.Router();

AuthRoutes.post('/register', register);
AuthRoutes.post('/login', login);

export { AuthRoutes };
