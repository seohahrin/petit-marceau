// src/modules/payment/application/create-checkout-session.ts
import type Stripe from 'stripe';
import { calculatePrice } from '@/modules/pricing/application/calculate-price';
import { stripe } from '@/modules/payment/infrastructure/stripe-client';

export interface CreateCheckoutSessionInput {
  checkIn: string;  // '2025-04-10'
  checkOut: string; // '2025-04-13'
  guests: number;
}

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput
): Promise<Stripe.Checkout.Session> {
  // 1) 가격 계산 (보안상 프론트 값 신뢰 X)
  const quote = await calculatePrice({
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
  });

  if (!quote.isValid) {
    throw new Error('Invalid booking request');
  }

  // 🔴 여기서 stripe가 없으면 바로 막기 (타입도 동시에 좁혀짐)
  if (!stripe) {
    throw new Error('Stripe is not configured. Missing STRIPE_SECRET_KEY.');
  }

  // 2) Checkout 세션 생성
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    currency: 'eur',
    line_items: [
      {
        quantity: 1,
        price_data: {
            currency: 'eur',
            // totalAmount = 유로 단위 → Stripe는 센트 단위라 * 100
            unit_amount: Math.round(quote.totalAmount * 100),
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
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/#book`,
  });

  return session;
}