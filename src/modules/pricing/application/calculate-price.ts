// src/modules/pricing/application/calculate-price.ts

import type { PropertyRepository } from '@/modules/property/application/property-repository';

export interface CalculatePriceInput {
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
}

export interface CalculatePriceResult {
  nights: number;
  total: number;   // cents
  currency: string;
}

export async function calculatePriceUseCase(
  deps: { propertyRepo: PropertyRepository },
  input: CalculatePriceInput,
): Promise<CalculatePriceResult> {
  const { propertyId, checkIn, checkOut } = input;

  const property = await deps.propertyRepo.findById(propertyId);
  if (!property) {
    throw new Error('Property not found');
  }

  const msPerNight = 1000 * 60 * 60 * 24;
  const diffMs = checkOut.getTime() - checkIn.getTime();
  const nights = Math.round(diffMs / msPerNight);

  if (nights <= 0) {
    throw new Error('Check-out date must be after check-in date');
  }

  const total =
    nights * property.basePricePerNight + property.cleaningFee;

  return {
    nights,
    total,
    currency: 'EUR',
  };
}