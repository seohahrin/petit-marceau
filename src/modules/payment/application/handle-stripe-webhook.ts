// src/modules/payment/application/handle-stripe-webhook.ts

import Stripe from 'stripe';
import type { BookingRepository } from '@/modules/booking/infrastructure/booking-repo.prisma';
import { createBookingFromStripeSession } from '@/modules/booking/application/create-booking-from-stripe-session';

export interface StripeWebhookDeps {
  bookingRepo: BookingRepository;
  defaultPropertyId: string;
}

export async function handleStripeWebhookEvent(
  event: Stripe.Event,
  deps: StripeWebhookDeps,
) {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await createBookingFromStripeSession(deps, session);
      break;
    }

    default:
      // 관심 없는 이벤트는 무시
      break;
  }
}