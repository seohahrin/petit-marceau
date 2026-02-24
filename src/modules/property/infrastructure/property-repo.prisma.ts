// src/modules/property/infrastructure/property-repo.prisma.ts

import { prisma } from '@/shared/libs/prisma';
import type { Property } from '../domain/property';
import type { PropertyRepository } from '../application/property-repository';

export class PrismaPropertyRepository implements PropertyRepository {
  async findById(id: string): Promise<Property | null> {
    const row = await prisma.property.findUnique({
      where: { id },
    });

    if (!row) return null;

    const property: Property = {
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      maxGuests: row.maxGuests,
      basePricePerNight: row.basePricePerNight,
      cleaningFee: row.cleaningFee,
      city: row.city,
      country: row.country,
      timezone: row.timezone,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };

    return property;
  }
}