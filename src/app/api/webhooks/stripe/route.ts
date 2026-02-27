// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/shared/libs/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('❌ STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed.', err?.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.mode === 'payment') {
      const metadata = session.metadata ?? {};

      const propertyId = process.env.DEFAULT_PROPERTY_ID; // 🔥 단일 숙소면 .env에 이걸 박아두는 방식 추천
      const checkInDateStr = metadata.checkInDate;
      const checkOutDateStr = metadata.checkOutDate;
      const guestName = metadata.guestName;
      const guestEmail = metadata.guestEmail;
      const totalAmountCentsStr = metadata.totalAmountCents;
      const nightsStr = metadata.nights;

      const paymentIntentId =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id;

      if (!paymentIntentId) {
        console.warn('⚠️ No payment_intent on checkout.session.completed', session.id);
        return NextResponse.json({ received: true });
      }

      // Stripe 재전송 대비: 이미 Booking이 있으면 만들지 않기
      const existing = await prisma.booking.findUnique({
        where: { stripePaymentIntentId: paymentIntentId },
      });

      if (existing) {
        console.log('ℹ️ Booking already exists for paymentIntent', paymentIntentId);
        return NextResponse.json({ received: true });
      }

      if (
        !propertyId ||
        !checkInDateStr ||
        !checkOutDateStr ||
        !guestName ||
        !guestEmail
      ) {
        console.warn('⚠️ Missing metadata for booking creation', {
          propertyId,
          checkInDateStr,
          checkOutDateStr,
          guestName,
          guestEmail,
        });
        return NextResponse.json({ received: true });
      }

      const checkInDate = new Date(checkInDateStr);
      const checkOutDate = new Date(checkOutDateStr);

      let nights =
        nightsStr != null
          ? Number(nightsStr)
          : Math.max(
              1,
              Math.round(
                (checkOutDate.getTime() - checkInDate.getTime()) /
                  (1000 * 60 * 60 * 24),
              ),
            );

      const totalAmount =
        totalAmountCentsStr != null
          ? Number(totalAmountCentsStr)
          : session.amount_total ?? 0;

      const currency = (session.currency ?? 'EUR').toUpperCase();

      try {
        await prisma.booking.create({
          data: {
            propertyId,
            guestName,
            guestEmail,
            checkInDate,
            checkOutDate,
            nights,
            totalAmount,
            currency,
            status: 'CONFIRMED',
            stripePaymentIntentId: paymentIntentId,
          },
        });

        console.log('✅ Booking created for paymentIntent', paymentIntentId);
      } catch (error) {
        console.error('🔥 Error creating booking', error);
      }
    }
  } else {
    console.log(`➡️ Received event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}