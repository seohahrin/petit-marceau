// src/modules/property/domain/property.ts

export interface Property {
    id: string;
    name: string;
    slug: string;
    description: string;
    maxGuests: number;
    basePricePerNight: number; // cents
    cleaningFee: number;       // cents
    city?: string | null;
    country?: string | null;
    timezone: string;
    createdAt: Date;
    updatedAt: Date;
  }