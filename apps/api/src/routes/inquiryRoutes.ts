import { Router } from 'express';
import * as inquiryController from '../controllers/inquiryController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  createInquiryValidators,
  inquiryIdParam,
  updateInquiryValidators,
} from '../validators/inquiryValidators.js';

const router = Router();

router.post('/', createInquiryValidators, validateRequest, asyncHandler(inquiryController.create));

router.use(requireAuth);
router.get('/', asyncHandler(inquiryController.list));
router.get('/:id', inquiryIdParam, validateRequest, asyncHandler(inquiryController.getById));
router.put('/:id', updateInquiryValidators, validateRequest, asyncHandler(inquiryController.update));
router.delete('/:id', inquiryIdParam, validateRequest, asyncHandler(inquiryController.remove));

export default router;
