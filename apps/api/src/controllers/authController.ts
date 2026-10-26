import type { Request, Response } from 'express';
import * as authService from '../services/authService.js';

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as { email: string; password: string };
  const result = await authService.loginAdmin(email, password);
  res.json(result);
}
