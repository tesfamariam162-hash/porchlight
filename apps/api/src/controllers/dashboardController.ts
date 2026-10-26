import type { Request, Response } from 'express';
import * as dashboardService from '../services/dashboardService.js';

export async function stats(_req: Request, res: Response): Promise<void> {
  const data = await dashboardService.getDashboardStats();
  res.json(data);
}
