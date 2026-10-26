import { INQUIRY_STATUSES } from '@porchlight/shared';
import { body, param } from 'express-validator';

export const inquiryIdParam = [param('id').isString().notEmpty()];

export const createInquiryValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('apartmentId').optional({ nullable: true }).isString(),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

export const updateInquiryValidators = [
  ...inquiryIdParam,
  body('status')
    .optional()
    .isIn([...INQUIRY_STATUSES])
    .withMessage('Invalid inquiry status'),
  body('internalNotes').optional({ nullable: true }).isString(),
];
