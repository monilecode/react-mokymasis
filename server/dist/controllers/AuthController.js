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
const mongoose = require('mongoose');
const { UserModel } = require('../models/UserModel');
const { generateToken } = require('../utils/password');
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const foundUser = yield UserModel.findOne({ email: userData.email });
    if (foundUser !== null) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }
    try {
        const createdUser = UserModel(userData);
        yield createdUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error registering new user.', error: error.message });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        const foundUser = yield UserModel.findOne({ email });
        if (!foundUser) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        const passwordIsCorrect = yield foundUser.isCorrectPassword(password);
        if (!passwordIsCorrect) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        const token = generateToken({ id: foundUser._id });
        return res.status(200).json({ status: 'success', token, user: foundUser });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error logging in.', error: error.message });
    }
});
module.exports = { register, login };
