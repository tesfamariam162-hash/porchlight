import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from '../utils/errors.js';

export function validateRequest(req: Request, _res: Response, next: NextFunction): void {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors: Record<string, string[]> = {};
    for (const e of result.array()) {
      const field = 'path' in e && typeof e.path === 'string' ? e.path : 'body';
      if (!errors[field]) errors[field] = [];
      errors[field].push(e.msg);
    }
    next(new AppError(400, 'Validation failed', errors));
    return;
  }
  next();
}
