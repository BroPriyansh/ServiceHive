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
import { authLimiter } from '../middleware/rateLimit';

const router = express.Router();

router.post(
  '/register',
  authLimiter,
  registerValidator,
  validate,
  registerUser
);

router.post(
  '/login',
  authLimiter,
  loginValidator,
  validate,
  loginUser
);

export default router;