import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';

import User from '../models/User.model';

import generateToken from '../utils/generateToken';

// REGISTER USER

export const registerUser = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    // CHECK EXISTING USER

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message:
          'User already exists',
      });

    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // FORCE DEFAULT ROLE

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,

        // NEVER TRUST FRONTEND ROLE

        role: 'user',
      });

    res.status(201).json({
      success: true,

      token:
        generateToken(
          user._id.toString()
        ),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error,
    });

  }
};

// LOGIN USER

export const loginUser = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // FIND USER

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res.status(400).json({
        success: false,
        message:
          'Invalid credentials',
      });

    }

    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message:
          'Invalid credentials',
      });

    }

    res.json({
      success: true,

      token:
        generateToken(
          user._id.toString()
        ),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error,
    });

  }
};