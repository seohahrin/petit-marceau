// src/modules/pricing/application/calculate-price.ts
import { calculateQuote, PriceQuote, Currency } from '../domain/price';

export interface CalculatePriceRequest {
  checkIn: string;   // ISO date string (YYYY-MM-DD)
  checkOut: string;
  guests: number;
}

/**
 * 기본 가격 계산 함수
 * - 프론트의 /api/book/quote 에서 직접 사용
 */
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

/**
 * 기존 booking use case에서 사용하던 시그니처를 맞춰주는 래퍼
 *
 * create-booking.ts 에서는 이렇게 호출하고 있음:
 *
 *   const { nights, total, currency } = await calculatePriceUseCase(
 *     { propertyRepo: deps.propertyRepo },
 *     { propertyId, checkIn: checkInDate, checkOut: checkOutDate },
 *   );
 *
 * 그래서 여기서 그 형태에 맞춰주고, 내부적으로는 새 calculatePrice 를 재사용한다.
 */
export async function calculatePriceUseCase(
  _deps: any,
  params: {
    propertyId: string;
    checkIn: Date;
    checkOut: Date;
    guests?: number;
  }
): Promise<{ nights: number; total: number; currency: Currency }> {
  const { checkIn, checkOut, guests = 1 } = params;

  const checkInStr = checkIn.toISOString().slice(0, 10);  // YYYY-MM-DD
  const checkOutStr = checkOut.toISOString().slice(0, 10);

  const quote = await calculatePrice({
    checkIn: checkInStr,
    checkOut: checkOutStr,
    guests,
  });

  return {
    nights: quote.nights,
    total: quote.totalAmount,
    currency: quote.currency,
  };
}