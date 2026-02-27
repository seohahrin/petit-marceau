// src/modules/pricing/domain/price.ts

export type Currency = 'EUR';

export interface PriceQuoteInput {
  checkIn: Date;
  checkOut: Date;
  guests: number;
}

export interface PriceQuote {
  nights: number;
  baseNightlyPrice: number;
  cleaningFee: number;
  totalAmount: number;
  currency: Currency;
  minNights: number;
  isValid: boolean;
  reason?: string;
}

const BASE_NIGHTLY_PRICE = 220; // €220 / night
const CLEANING_FEE = 60;        // €60 / stay
const MIN_NIGHTS = 1;           // ✅ 최소 1박

function diffInNights(checkIn: Date, checkOut: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = checkOut.getTime() - checkIn.getTime();
  return Math.round(diff / msPerDay);
}

export function calculateQuote(input: PriceQuoteInput): PriceQuote {
  const { checkIn, checkOut } = input;

  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
    return {
      nights: 0,
      baseNightlyPrice: BASE_NIGHTLY_PRICE,
      cleaningFee: CLEANING_FEE,
      totalAmount: 0,
      currency: 'EUR',
      minNights: MIN_NIGHTS,
      isValid: false,
      reason: '날짜 형식이 올바르지 않습니다.',
    };
  }

  const nights = diffInNights(checkIn, checkOut);

  if (nights <= 0) {
    return {
      nights: 0,
      baseNightlyPrice: BASE_NIGHTLY_PRICE,
      cleaningFee: CLEANING_FEE,
      totalAmount: 0,
      currency: 'EUR',
      minNights: MIN_NIGHTS,
      isValid: false,
      reason: '체크아웃 날짜는 체크인 이후여야 합니다.',
    };
  }

  // ✅ 최소 1박이므로, 1박 이상이면 전부 유효
  const totalAmount = nights * BASE_NIGHTLY_PRICE + CLEANING_FEE;

  return {
    nights,
    baseNightlyPrice: BASE_NIGHTLY_PRICE,
    cleaningFee: CLEANING_FEE,
    totalAmount,
    currency: 'EUR',
    minNights: MIN_NIGHTS,
    isValid: true,
  };
}