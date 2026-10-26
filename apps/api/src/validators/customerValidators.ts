import { body, param } from 'express-validator';

export const customerIdParam = [param('id').isString().notEmpty()];

export const updateCustomerValidators = [
  ...customerIdParam,
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('notes').optional({ nullable: true }).isString(),
];
