// src/modules/booking/infrastructure/booking-repo.prisma.ts
import { prisma } from '@/shared/libs/prisma';
import { Booking, BookingStatus } from '../domain/booking';

export interface CreateBookingData {
  propertyId: string;
  guestName: string;
  guestEmail: string;
  checkInDate: Date;
  checkOutDate: Date;
  nights: number;
  totalAmount: number;
  currency: string;
  status?: BookingStatus;   // ✅ 추가
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
        status: data.status ?? 'PENDING',   // ✅ 기본값은 여전히 PENDING
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