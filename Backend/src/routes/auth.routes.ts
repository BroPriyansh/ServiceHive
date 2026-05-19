import express from 'express';

import {
  registerUser,
  loginUser,
} from '../controllers/auth.controller';

import {
  registerValidator,
  loginValidator,
} from '../validators/auth.validator';

import { validate } from '../middleware/validate.middleware';

const router = express.Router();

router.post(
  '/register',
  registerValidator,
  validate,
  registerUser
);

router.post(
  '/login',
  loginValidator,
  validate,
  loginUser
);

export default router;