import { Router } from 'express';
import * as amenityController from '../controllers/amenityController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  amenityIdParam,
  createAmenityValidators,
  updateAmenityValidators,
} from '../validators/amenityValidators.js';

const router = Router();

router.get('/', asyncHandler(amenityController.list));
router.post('/', requireAuth, createAmenityValidators, validateRequest, asyncHandler(amenityController.create));
router.put('/:id', requireAuth, updateAmenityValidators, validateRequest, asyncHandler(amenityController.update));

export default router;
