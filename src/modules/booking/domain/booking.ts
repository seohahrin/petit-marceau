// src/modules/booking/domain/booking.ts

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface BookingProps {
  id: string;
  propertyId: string;
  guestName: string;
  guestEmail: string;
  checkInDate: Date;
  checkOutDate: Date;
  nights: number;
  totalAmount: number; // cents
  currency: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Booking {
  constructor(private props: BookingProps) {}

  get id() {
    return this.props.id;
  }

  get status() {
    return this.props.status;
  }

  get period() {
    return {
      checkIn: this.props.checkInDate,
      checkOut: this.props.checkOutDate,
    };
  }

  confirm() {
    if (this.props.status === 'PENDING') {
      this.props.status = 'CONFIRMED';
    }
  }

  cancel() {
    if (this.props.status !== 'CANCELLED') {
      this.props.status = 'CANCELLED';
    }
  }

  toJSON() {
    return this.props;
  }
}