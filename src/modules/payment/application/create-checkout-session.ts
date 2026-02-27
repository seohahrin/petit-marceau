// src/modules/payment/application/create-checkout-session.ts
import type Stripe from 'stripe';
import { calculatePrice } from '@/modules/pricing/application/calculate-price';
import { stripe } from '@/modules/payment/infrastructure/stripe-client';

export interface CreateCheckoutSessionInput {
  checkIn: string;   // '2025-04-10'
  checkOut: string;  // '2025-04-13'
  guests: number;
  origin: string;    // https://... 형태의 절대 URL
  guestName: string; // 예약자 이름
  guestEmail: string; // 예약자 이메일
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

  // 🔐 origin이 진짜 "절대 URL"인지 방어
  try {
    // new URL이 에러 안 나면 유효한 절대 URL
    // eslint-disable-next-line no-new
    new URL(input.origin);
  } catch {
    throw new Error('Invalid origin URL for Checkout session.');
  }

  const baseUrl = input.origin;

  // 💶 DB에 그대로 넣을 수 있도록 cents 단위로 미리 계산
  const totalAmountCents = Math.round(quote.totalAmount * 100);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    currency: 'eur',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: totalAmountCents, // 유로 → 센트
          product_data: {
            name: 'Petit Marceau · Stay',
            description: `Stay from ${input.checkIn} to ${input.checkOut} for ${input.guests} guest(s)`,
          },
        },
      },
    ],
    // 🔥 Webhook에서 Booking 생성에 사용할 정보들
    metadata: {
      checkInDate: input.checkIn,
      checkOutDate: input.checkOut,
      guests: String(input.guests),
      guestName: input.guestName,
      guestEmail: input.guestEmail,
      // calculatePrice 쪽에 nights가 있다면 그대로 쓰고,
      // 없다면 Webhook 쪽에서 날짜 차이로 다시 계산해도 OK
      nights: quote.nights != null ? String(quote.nights) : undefined,
      totalAmountCents: String(totalAmountCents),
    },
    success_url: `${baseUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/#book`,
  });

  return session;
}