// src/app/api/book/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/modules/payment/application/create-checkout-session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { checkIn, checkOut, guests } = body ?? {};

    if (!checkIn || !checkOut || !guests) {
      return NextResponse.json(
        { error: 'checkIn, checkOut, guests는 필수입니다.' },
        { status: 400 }
      );
    }

    // 🔥 여기서 현재 도메인(https://... 포함)을 가져옴
    const origin = request.nextUrl.origin;

    const session = await createCheckoutSession({
      checkIn,
      checkOut,
      guests: Number(guests),
      origin,
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
      { error: error?.message ?? '결제 세션 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}