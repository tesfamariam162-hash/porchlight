import type { Request, Response } from 'express';
import * as inquiryService from '../services/inquiryService.js';

export async function create(req: Request, res: Response): Promise<void> {
  const data = await inquiryService.createInquiry(req.body);
  res.status(201).json(data);
}

export async function list(req: Request, res: Response): Promise<void> {
  const status = typeof req.query.status === 'string' ? req.query.status : undefined;
  const search = typeof req.query.search === 'string' ? req.query.search : undefined;
  const data = await inquiryService.listInquiries({ status, search });
  res.json(data);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const data = await inquiryService.getInquiryById(req.params.id);
  res.json(data);
}

export async function update(req: Request, res: Response): Promise<void> {
  const data = await inquiryService.updateInquiry(req.params.id, req.body);
  res.json(data);
}

export async function remove(req: Request, res: Response): Promise<void> {
  await inquiryService.deleteInquiry(req.params.id);
  res.status(204).send();
}
