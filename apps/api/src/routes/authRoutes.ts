import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateRequest } from '../middleware/validate.js';
import { loginValidators } from '../validators/authValidators.js';

const router = Router();

router.post('/login', loginValidators, validateRequest, asyncHandler(authController.login));

export default router;
