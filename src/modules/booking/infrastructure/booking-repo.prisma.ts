// src/modules/booking/infrastructure/booking-repo.prisma.ts

import { prisma } from '@/shared/libs/prisma';
import { Booking } from '../domain/booking';

export interface CreateBookingData {
  propertyId: string;
  guestName: string;
  guestEmail: string;
  checkInDate: Date;
  checkOutDate: Date;
  nights: number;
  totalAmount: number;
  currency: string;
}

export interface BookingRepository {
  create(data: CreateBookingData): Promise<Booking>;
}

export class PrismaBookingRepository implements BookingRepository {
  async create(data: CreateBookingData): Promise<Booking> {
    const created = await prisma.booking.create({
      data: {
        propertyId: data.propertyId,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        nights: data.nights,
        totalAmount: data.totalAmount,
        currency: data.currency,
        status: 'PENDING',
      },
    });

    return new Booking({
      id: created.id,
      propertyId: created.propertyId,
      guestName: created.guestName,
      guestEmail: created.guestEmail,
      checkInDate: created.checkInDate,
      checkOutDate: created.checkOutDate,
      nights: created.nights,
      totalAmount: created.totalAmount,
      currency: created.currency,
      status: created.status as any,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }
}