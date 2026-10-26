import { body, param } from 'express-validator';

export const amenityIdParam = [param('id').isString().notEmpty()];

export const createAmenityValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
  body('icon').optional({ nullable: true }).isString(),
  body('description').optional({ nullable: true }).isString(),
];

export const updateAmenityValidators = [...amenityIdParam, ...createAmenityValidators];
