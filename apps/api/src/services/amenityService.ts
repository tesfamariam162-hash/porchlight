import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/errors.js';

export async function listAmenities() {
  return prisma.amenity.findMany({ orderBy: { name: 'asc' } });
}

export async function createAmenity(data: {
  name: string;
  slug: string;
  icon?: string | null;
  description?: string | null;
}) {
  return prisma.amenity.create({ data });
}

export async function updateAmenity(
  id: string,
  data: { name: string; slug: string; icon?: string | null; description?: string | null },
) {
  const existing = await prisma.amenity.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Amenity not found');
  return prisma.amenity.update({ where: { id }, data });
}
