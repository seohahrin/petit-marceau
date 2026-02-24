// src/app/api/book/route.ts
import { NextResponse } from 'next/server';
import { PrismaBookingRepository } from '@/modules/booking/infrastructure/booking-repo.prisma';
import { PrismaPropertyRepository } from '@/modules/property/infrastructure/property-repo.prisma';
import { createBookingUseCase } from '@/modules/booking/application/create-booking';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      propertyId,
      guestName,
      guestEmail,
      checkInDate,
      checkOutDate,
    } = body ?? {};

    if (
      !propertyId ||
      !guestName ||
      !guestEmail ||
      !checkInDate ||
      !checkOutDate
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const bookingRepo = new PrismaBookingRepository();
    const propertyRepo = new PrismaPropertyRepository();

    const result = await createBookingUseCase(
      { bookingRepo, propertyRepo },
      {
        propertyId,
        guestName,
        guestEmail,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      },
    );

    return NextResponse.json({
      bookingId: result.booking.id,
      nights: result.nights,
      total: result.total,
      currency: result.currency,
      status: result.booking.status,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}