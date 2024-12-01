"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const UserModel_1 = require("../models/UserModel");
const password_1 = require("../utils/password");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const foundUser = yield UserModel_1.UserModel.findOne({ email: userData.email });
    if (foundUser !== null) {
        res.status(400).json({ message: 'User with this email already exists' });
        return;
    }
    try {
        const createdUser = new UserModel_1.UserModel(userData);
        yield createdUser.save();
        res.status(201).json({ message: 'User registered successfully' });
        return;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: 'Error registering new user.', error: errorMessage });
        return;
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Please provide email and password' });
            return;
        }
        const foundUser = yield UserModel_1.UserModel.findOne({ email });
        if (!foundUser) {
            res.status(401).json({ message: 'Incorrect email or password' });
            return;
        }
        const passwordIsCorrect = yield foundUser.isCorrectPassword(password);
        if (!passwordIsCorrect) {
            res.status(401).json({ message: 'Incorrect email or password' });
            return;
        }
        const token = (0, password_1.generateToken)({ id: foundUser._id });
        res.status(200).json({ status: 'success', token, user: foundUser });
        return;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: 'Error logging in.', error: errorMessage });
        return;
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ message: 'User logged out successfully' });
        return;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: 'Error logging out.', error: errorMessage });
        return;
    }
});
exports.logout = logout;
