// src/modules/payment/application/create-checkout-session.ts
import Stripe from 'stripe';
import { calculatePrice } from '@/modules/pricing/application/calculate-price';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// ⚠️ 여기서 바로 throw 하지 말고, stripe 없으면 null로 두기
let stripe: Stripe | null = null;

if (stripeSecretKey) {
  console.log('[Stripe] Using key prefix:', stripeSecretKey.slice(0, 7)); // sk_test만 출력
  stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20' as any,
  });
} else {
  console.warn('[Stripe] STRIPE_SECRET_KEY is not set. Stripe checkout is disabled.');
}

export interface CreateCheckoutSessionInput {
  checkIn: string;   // '2025-04-10'
  checkOut: string;  // '2025-04-13'
  guests: number;
}

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput
) {
  if (!stripe) {
    // ✅ 이제 여기서만 에러를 던짐 (실제로 결제 시도할 때)
    throw new Error('Stripe is not configured on this server.');
  }

  // 1) 가격 계산 (보안상 프론트 값 신뢰 X)
  const quote = await calculatePrice({
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
  });

  if (!quote.isValid) {
    throw new Error(quote.reason || 'Invalid booking data');
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  try {
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
  } catch (err: any) {
    console.error('[Stripe] checkout.sessions.create error:');
    console.error('  message:', err?.message);
    console.error('  type:', err?.type);
    console.error('  code:', err?.code);
    console.error('  rawType:', err?.rawType);
    console.error('  errno:', err?.errno);
    console.error('  stack:', err?.stack);

    throw err;
  }
}