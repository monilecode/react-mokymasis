import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { UserModel } from '../models/UserModel';
import { generateToken } from '../utils/password';

const register = async (req: Request, res: Response): Promise<void> => {
  const userData = req.body;

  const foundUser = await UserModel.findOne({ email: userData.email });
  if (foundUser !== null) {
    res.status(400).json({ message: 'User with this email already exists' });
    return;
  }

  try {
    const createdUser = new UserModel(userData);
    await createdUser.save();

    res.status(201).json({ message: 'User registered successfully' });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error registering new user.', error: errorMessage });
    return;
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Please provide email and password' });
      return;
    }

    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      res.status(401).json({ message: 'Incorrect email or password' });
      return;
    }

    const passwordIsCorrect = await foundUser.isCorrectPassword(password);
    if (!passwordIsCorrect) {
      res.status(401).json({ message: 'Incorrect email or password' });
      return;
    }

    const token = generateToken({ id: foundUser._id });

    res.status(200).json({ status: 'success', token, user: foundUser });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error logging in.', error: errorMessage });
    return;
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: 'User logged out successfully' });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error logging out.', error: errorMessage });
    return;
  }
};

export { register, login, logout };
