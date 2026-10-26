import type { Request, Response } from 'express';
import * as amenityService from '../services/amenityService.js';

export async function list(_req: Request, res: Response): Promise<void> {
  const data = await amenityService.listAmenities();
  res.json(data);
}

export async function create(req: Request, res: Response): Promise<void> {
  const data = await amenityService.createAmenity(req.body);
  res.status(201).json(data);
}

export async function update(req: Request, res: Response): Promise<void> {
  const data = await amenityService.updateAmenity(req.params.id, req.body);
  res.json(data);
}
