// src/modules/payment/application/create-checkout-session.ts
import type Stripe from 'stripe';
import { calculatePrice } from '@/modules/pricing/application/calculate-price';
import { stripe } from '@/modules/payment/infrastructure/stripe-client';

export interface CreateCheckoutSessionInput {
  checkIn: string;   // '2025-04-10'
  checkOut: string;  // '2025-04-13'
  guests: number;
  origin: string;    // 🔥 추가: 현재 도메인 (https://... 포함)
}

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput
): Promise<Stripe.Checkout.Session> {
  // 1) 가격 계산
  const quote = await calculatePrice({
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
  });

  if (!quote.isValid) {
    throw new Error(quote.reason ?? 'Invalid booking request');
  }

  if (!stripe) {
    throw new Error('Stripe is not configured. Missing STRIPE_SECRET_KEY.');
  }

  // 🔐 origin이 진짜 "절대 URL"인지 한 번 방어 (선택이지만 안전)
  try {
    // new URL이 에러 안 나면 유효한 절대 URL
    // eslint-disable-next-line no-new
    new URL(input.origin);
  } catch {
    throw new Error('Invalid origin URL for Checkout session.');
  }

  const baseUrl = input.origin;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    currency: 'eur',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(quote.totalAmount * 100), // 유로→센트
          product_data: {
            name: 'Petit Marceau · Stay',
            description: `Stay from ${input.checkIn} to ${input.checkOut} for ${input.guests} guest(s)`,
          },
        },
      },
    ],
    metadata: {
      checkIn: input.checkIn,
      checkOut: input.checkOut,
      guests: String(input.guests),
    },
    success_url: `${baseUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/#book`,
  });

  return session;
}