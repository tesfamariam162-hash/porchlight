import type { Request, Response } from 'express';
import * as customerService from '../services/customerService.js';
import { mapCustomer } from '../utils/mappers.js';

export async function create(req: Request, res: Response): Promise<void> {
  const data = await customerService.createCustomer(req.body);
  res.status(201).json(data);
}

export async function list(req: Request, res: Response): Promise<void> {
  const search = typeof req.query.search === 'string' ? req.query.search : undefined;
  const data = await customerService.listCustomers(search);
  res.json(data);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const customer = await customerService.getCustomerById(req.params.id);
  res.json({
    ...mapCustomer(customer),
    inquiries: customer.inquiries.map((i) => ({
      id: i.id,
      subject: i.subject,
      status: i.status,
      createdAt: i.createdAt.toISOString(),
      apartment: i.apartment,
    })),
  });
}

export async function update(req: Request, res: Response): Promise<void> {
  const data = await customerService.updateCustomer(req.params.id, req.body);
  res.json(data);
}

export async function remove(req: Request, res: Response): Promise<void> {
  await customerService.deleteCustomer(req.params.id);
  res.status(204).send();
}
