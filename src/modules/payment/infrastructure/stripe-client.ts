// src/modules/payment/infrastructure/stripe-client.ts
import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

// 🔥 지금 단계에서는 무조건 test 키만 허용
//    sk_live_로 시작하면 바로 에러 던지기
if (secretKey.startsWith('sk_live_')) {
  throw new Error(
    'STRIPE_SECRET_KEY is a LIVE key. For now, use a sk_test_ key only.',
  );
}

// 디버깅용 로그 (prefix 확인)
console.log('[Stripe] Using secret key prefix:', secretKey.slice(0, 7));

export const stripe = new Stripe(secretKey, {
  apiVersion: '2024-06-20' as any,
});