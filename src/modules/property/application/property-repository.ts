// src/modules/property/application/property-repository.ts

import type { Property } from '../domain/property';

export interface PropertyRepository {
  findById(id: string): Promise<Property | null>;
}