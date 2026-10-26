import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { AuthLoginResponse } from '@porchlight/shared';
import { prisma } from '../config/prisma.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/errors.js';

export async function loginAdmin(email: string, password: string): Promise<AuthLoginResponse> {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    throw new AppError(401, 'Invalid email or password');
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    throw new AppError(401, 'Invalid email or password');
  }

  const token = jwt.sign(
    { adminId: admin.id, email: admin.email },
    env.jwtSecret,
    { expiresIn: '8h' },
  );

  return {
    token,
    admin: { id: admin.id, email: admin.email, name: admin.name },
  };
}
