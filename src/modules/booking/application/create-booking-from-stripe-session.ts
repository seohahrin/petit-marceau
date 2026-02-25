// src/modules/booking/application/create-booking-from-stripe-session.ts

import Stripe from 'stripe';
import type { BookingRepository } from '../infrastructure/booking-repo.prisma';
import type { Booking } from '../domain/booking';

export interface CreateBookingFromStripeDeps {
  bookingRepo: BookingRepository;
  defaultPropertyId: string;
}

export async function createBookingFromStripeSession(
  deps: CreateBookingFromStripeDeps,
  session: Stripe.Checkout.Session,
): Promise<Booking> {
  const { bookingRepo, defaultPropertyId } = deps;

  const meta = session.metadata ?? {};

  const checkIn = meta.checkIn;
  const checkOut = meta.checkOut;
  const guests = meta.guests ? Number(meta.guests) : 1;
  const nights = meta.nights ? Number(meta.nights) : 0;
  const totalAmount = meta.totalAmount ? Number(meta.totalAmount) : 0;
  const currency = meta.currency ?? (session.currency?.toUpperCase() ?? 'EUR');

  if (!checkIn || !checkOut) {
    throw new Error('Missing check-in / check-out in Stripe metadata');
  }

  const guestEmail =
    session.customer_details?.email ??
    session.customer_email ??
    '';

  const guestName =
    session.customer_details?.name ??
    'Guest';

  const propertyId = meta.propertyId ?? defaultPropertyId;

  if (!propertyId) {
    throw new Error(
      'propertyId is missing. Set metadata.propertyId in checkout session or provide defaultPropertyId.',
    );
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const booking = await bookingRepo.create({
    propertyId,
    guestName,
    guestEmail,
    checkInDate,
    checkOutDate,
    nights,
    totalAmount,
    currency,
    status: 'CONFIRMED', // ✅ 결제 완료이므로 확정
  });

  return booking;
}