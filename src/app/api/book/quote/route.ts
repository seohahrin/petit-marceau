// src/app/api/book/quote/route.ts
import { NextResponse } from 'next/server';
import { calculatePrice } from '@/modules/pricing/application/calculate-price';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { checkIn, checkOut, guests } = body ?? {};

    if (!checkIn || !checkOut || !guests) {
      return NextResponse.json(
        { error: 'checkIn, checkOut, guests는 필수입니다.' },
        { status: 400 }
      );
    }

    const quote = await calculatePrice({
      checkIn,
      checkOut,
      guests: Number(guests),
    });

    return NextResponse.json(quote, { status: 200 });
  } catch (error) {
    console.error('[API] /api/book/quote error', error);
    return NextResponse.json(
      { error: '가격 계산 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}