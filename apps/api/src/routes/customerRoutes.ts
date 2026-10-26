import { Router } from 'express';
import * as customerController from '../controllers/customerController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { customerIdParam, updateCustomerValidators } from '../validators/customerValidators.js';

const router = Router();

router.use(requireAuth);

router.get('/', asyncHandler(customerController.list));
router.post('/', asyncHandler(customerController.create));
router.get('/:id', customerIdParam, validateRequest, asyncHandler(customerController.getById));
router.put('/:id', updateCustomerValidators, validateRequest, asyncHandler(customerController.update));
router.delete('/:id', customerIdParam, validateRequest, asyncHandler(customerController.remove));

export default router;
