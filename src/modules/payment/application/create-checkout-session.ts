// src/modules/payment/application/create-checkout-session.ts
import Stripe from 'stripe';
import { calculatePrice } from '@/modules/pricing/application/calculate-price';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set in .env');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20' as any,
});

export interface CreateCheckoutSessionInput {
  checkIn: string;   // '2025-04-10'
  checkOut: string;  // '2025-04-13'
  guests: number;
}

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput
) {
  // 가격 다시 계산 (보안 상 프론트 값 믿지 않기)
  const quote = await calculatePrice({
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
  });

  if (!quote.isValid) {
    throw new Error(quote.reason || 'Invalid booking data');
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    currency: 'eur',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Petit Marceau · Paris',
            description: `${quote.nights} nights · ${input.checkIn} → ${input.checkOut} · ${input.guests} guest(s)`,
          },
          unit_amount: quote.totalAmount * 100, // cents
        },
      },
    ],
    success_url: `${siteUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/#booking`,
    metadata: {
      checkIn: input.checkIn,
      checkOut: input.checkOut,
      guests: String(input.guests),
      nights: String(quote.nights),
      totalAmount: String(quote.totalAmount),
      currency: quote.currency,
    },
  });

  return {
    id: session.id,
    url: session.url,
  };
}