// src/modules/pricing/application/calculate-price.ts
import { calculateQuote, PriceQuote } from '../domain/price';

export interface CalculatePriceRequest {
  checkIn: string;   // ISO date string
  checkOut: string;
  guests: number;
}

export async function calculatePrice(
  input: CalculatePriceRequest
): Promise<PriceQuote> {
  const checkInDate = new Date(input.checkIn);
  const checkOutDate = new Date(input.checkOut);

  return calculateQuote({
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests: input.guests,
  });
}