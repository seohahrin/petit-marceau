// src/app/api/book/checkout/route.ts
import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/modules/payment/application/create-checkout-session';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      checkIn,
      checkOut,
      guests,
      guestName,
      guestEmail,
    } = body ?? {};

    if (!checkIn || !checkOut || !guests) {
      return NextResponse.json(
        { error: 'checkIn, checkOut, guests는 필수입니다.' },
        { status: 400 }
      );
    }

    if (!guestName || !guestEmail) {
      return NextResponse.json(
        { error: 'guestName, guestEmail은 필수입니다.' },
        { status: 400 }
      );
    }

    // origin: 브라우저/도메인 기준 절대 URL
    const url = new URL(request.url);
    const origin =
      process.env.NEXT_PUBLIC_APP_URL ?? `${url.protocol}//${url.host}`;

    const session = await createCheckoutSession({
      checkIn,
      checkOut,
      guests: Number(guests),
      origin,
      guestName,
      guestEmail,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe Checkout URL 생성에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error: any) {
    console.error('[API] /api/book/checkout error', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}