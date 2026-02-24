// src/modules/booking/application/create-booking.ts

import type { Booking } from '../domain/booking';
import type { BookingRepository } from '../infrastructure/booking-repo.prisma';
import type { PropertyRepository } from '@/modules/property/application/property-repository';
import { calculatePriceUseCase } from '@/modules/pricing/application/calculate-price';

export interface CreateBookingInput {
  propertyId: string;
  guestName: string;
  guestEmail: string;
  checkInDate: Date;
  checkOutDate: Date;
}

export interface CreateBookingResult {
  booking: Booking;
  nights: number;
  total: number;
  currency: string;
}

export async function createBookingUseCase(
  deps: {
    bookingRepo: BookingRepository;
    propertyRepo: PropertyRepository;
  },
  input: CreateBookingInput,
): Promise<CreateBookingResult> {
  const { propertyId, guestName, guestEmail, checkInDate, checkOutDate } = input;

  // 1) 가격 계산
  const { nights, total, currency } = await calculatePriceUseCase(
    { propertyRepo: deps.propertyRepo },
    { propertyId, checkIn: checkInDate, checkOut: checkOutDate },
  );

  // 2) 예약 생성 (PENDING)
  const booking = await deps.bookingRepo.create({
    propertyId,
    guestName,
    guestEmail,
    checkInDate,
    checkOutDate,
    nights,
    totalAmount: total,
    currency,
  });

  // (나중에 3) 단계에서 Stripe PaymentIntent, 이메일 등 붙이면 됨)

  return {
    booking,
    nights,
    total,
    currency,
  };
}