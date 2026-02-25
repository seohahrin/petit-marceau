// src/app/api/webhooks/stripe/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/modules/payment/infrastructure/stripe-client';
import { handleStripeWebhookEvent } from '@/modules/payment/application/handle-stripe-webhook';
import { PrismaBookingRepository } from '@/modules/booking/infrastructure/booking-repo.prisma';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const defaultPropertyId = process.env.DEFAULT_PROPERTY_ID;

  if (!sig || !webhookSecret) {
    return new NextResponse('Missing stripe-signature or webhook secret', {
      status: 400,
    });
  }

  if (!defaultPropertyId) {
    console.error('DEFAULT_PROPERTY_ID is not set');
  }

  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const bookingRepo = new PrismaBookingRepository();

  try {
    await handleStripeWebhookEvent(event, {
      bookingRepo,
      defaultPropertyId: defaultPropertyId ?? '',
    });
  } catch (err) {
    console.error('❌ Error while handling Stripe webhook event:', err);
    return new NextResponse('Webhook handler failed', { status: 500 });
  }

  return NextResponse.json({ received: true });
}