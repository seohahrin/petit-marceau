// src/modules/payment/application/create-checkout-session.ts
import type Stripe from 'stripe';
import { calculatePrice } from '@/modules/pricing/application/calculate-price';
import { stripe } from '@/modules/payment/infrastructure/stripe-client';

export interface CreateCheckoutSessionInput {
  checkIn: string;   // '2025-04-10'
  checkOut: string;  // '2025-04-13'
  guests: number;
}

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput
) {
  // 1) 가격 계산 (보안상 프론트 값 신뢰 X)
  const quote = await calculatePrice({
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
  });

  if (!quote.isValid) {
    throw new Error(