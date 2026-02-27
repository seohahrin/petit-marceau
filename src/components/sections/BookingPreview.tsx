// src/components/sections/BookingPreview.tsx
'use client';

import { useState, useRef } from 'react';

type QuoteState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; message: string };

export default function BookingPreview() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [quote, setQuote] = useState<QuoteState>({ status: 'idle' });
  const [isRedirecting, setIsRedirecting] = useState(false);

  // 예약자 정보
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const checkInRef = useRef<HTMLInputElement | null>(null);
  const checkOutRef = useRef<HTMLInputElement | null>(null);

  const today = new Date().toISOString().split('T')[0];
  const canRequestQuote = checkIn && checkOut && guests > 0;

  // 견적이 유효하고, 두 번째 단계(결제 준비)인지 여부
  const isQuoteValid =
    quote.status === 'success' && quote.data?.isValid === true;

  const canProceedToPayment =
    isQuoteValid &&
    guestName.trim().length > 1 &&
    guestEmail.trim().length > 3 &&
    !isRedirecting;

  function resetQuoteFlow() {
    setQuote({ status: 'idle' });
    setFormError(null);
    // 날짜/게스트 바뀌면 이전 이름/메일은 그대로 둬도 되고, 초기화해도 됨
    // 여기서는 그대로 두는 쪽이 UX상 덜 답답해서 남겨둘게
  }

  function openPicker(ref: { current: HTMLInputElement | null }) {
    if (!ref.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyInput = ref.current as any;
    if (typeof anyInput.showPicker === 'function') {
      anyInput.showPicker();
    } else {
      ref.current.focus();
    }
  }

  async function fetchQuote() {
    setQuote({ status: 'loading' });
    setFormError(null);

    try {
      const res = await fetch('/api/book/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkIn, checkOut, guests }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || '가격 계산에 실패했습니다.');
      }

      const data = await res.json();
      setQuote({ status: 'success', data });
    } catch (error: any) {
      setQuote({
        status: 'error',
        message: error?.message ?? '알 수 없는 오류가 발생했습니다.',
      });
    }
  }

  async function startCheckout() {
    if (!canProceedToPayment) return;

    try {
      setIsRedirecting(true);
      setFormError(null);

      const res = await fetch('/api/book/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn,
          checkOut,
          guests,
          guestName,
          guestEmail,
        }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || '결제 세션 생성에 실패했습니다.');
      }

      const data = await res.json();
      if (!data.url) {
        throw new Error('Stripe Checkout URL이 없습니다.');
      }

      // Stripe Checkout으로 리다이렉트
      window.location.href = data.url;
    } catch (error: any) {
      setIsRedirecting(false);
      setFormError(error?.message ?? '결제 시작 중 오류가 발생했습니다.');
    }
  }

  async function handlePrimaryAction() {
    if (!canRequestQuote) return;

    // 이미 유효한 견적이 있고 → 두 번째 클릭이면 바로 결제 단계로
    if (isQuoteValid) {
      await startCheckout();
      return;
    }

    // 첫 번째 클릭 → 가격&가용 여부 확인
    await fetchQuote();
  }

  const buttonLabel = (() => {
    if (isRedirecting) return 'Redirecting to payment...';
    if (quote.status === 'loading') return 'Checking availability...';
    if (!canRequestQuote) return 'Select dates to check';
    if (isQuoteValid) return 'Proceed to payment';
    return 'Check Availability';
  })();

  const checkInDisplay = checkIn || '';
  const checkOutDisplay = checkOut || '';

  return (
    <section id="booking" className="py-20 lg:py-32 bg-stone-100/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* 왼쪽 설명 */}
          <div className="lg:col-span-5">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-muted mb-4">
              02
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal-900 mb-6">
              Booking
            </h2>
            <p className="font-serif text-lg text-charcoal-600 italic leading-relaxed mb-8">
              Book directly, securely, and instantly.
            </p>
            <p className="font-sans text-sm text-charcoal-600 leading-relaxed">
              First check availability and total price for your dates. If the
              stay is available, you can enter your details and continue to
              secure Stripe payment.
            </p>
          </div>

          {/* 오른쪽 패널 */}
          <div className="lg:col-span-7">
            <div className="bg-stone-50 border border-stone-300/60 p-8 lg:p-10">
              {/* 날짜 선택 */}
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-charcoal-600 mb-3">
                    Check-in
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select date"
                      value={checkInDisplay}
                      onClick={() => openPicker(checkInRef)}
                      readOnly
                      className="w-full px-4 py-3 bg-white border border-stone-300 font-sans text-sm text-charcoal-800 focus:outline-none focus:border-charcoal-600 transition-colors cursor-pointer"
                    />
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <input
                      ref={checkInRef}
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        resetQuoteFlow();
                      }}
                      className="absolute opacity-0 pointer-events-none"
                      tabIndex={-1}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-charcoal-600 mb-3">
                    Check-out
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select date"
                      value={checkOutDisplay}
                      onClick={() => openPicker(checkOutRef)}
                      readOnly
                      className="w-full px-4 py-3 bg-white border border-stone-300 font-sans text-sm text-charcoal-800 focus:outline-none focus:border-charcoal-600 transition-colors cursor-pointer"
                    />
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <input
                      ref={checkOutRef}
                      type="date"
                      min={checkIn || today}
                      value={checkOut}
                      onChange={(e) => {
                        setCheckOut(e.target.value);
                        resetQuoteFlow();
                      }}
                      className="absolute opacity-0 pointer-events-none"
                      tabIndex={-1}
                    />
                  </div>
                </div>
              </div>

              {/* 게스트 수 */}
              <div className="mb-8">
                <label className="block font-sans text-xs tracking-widest uppercase text-charcoal-600 mb-3">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => {
                    setGuests(Number(e.target.value));
                    resetQuoteFlow();
                  }}
                  className="w-full px-4 py-3 bg-white border border-stone-300 font-sans text-sm text-charcoal-800 focus:outline-none focus:border-charcoal-600 transition-colors appearance-none cursor-pointer"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                </select>
              </div>

              {/* 가격 요약 */}
              <div className="border-t border-stone-200 pt-6 mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-sm text-charcoal-600">
                    Nightly rate
                  </span>
                  <span className="font-sans text-sm text-charcoal-800">
                    {quote.status === 'success'
                      ? `€${quote.data.baseNightlyPrice}`
                      : '€—'}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-sm text-charcoal-600">
                    Cleaning fee
                  </span>
                  <span className="font-sans text-sm text-charcoal-800">
                    {quote.status === 'success'
                      ? `€${quote.data.cleaningFee}`
                      : '€—'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                  <span className="font-sans text-sm font-medium text-charcoal-900 uppercase tracking-wide">
                    Total
                  </span>
                  <span className="font-serif text-2xl text-charcoal-900">
                    {quote.status === 'success'
                      ? `€${quote.data.totalAmount}`
                      : '€—'}
                  </span>
                </div>
              </div>

              {/* 견적 유효 시 → 이름/메일 폼 노출 */}
              {isQuoteValid && (
                <div className="mb-6 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-charcoal-600 mb-2">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Name for the reservation"
                      className="w-full px-4 py-3 bg-white border border-stone-300 font-sans text-sm text-charcoal-800 focus:outline-none focus:border-charcoal-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-charcoal-600 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="Confirmation will be sent here"
                      className="w-full px-4 py-3 bg-white border border-stone-300 font-sans text-sm text-charcoal-800 focus:outline-none focus:border-charcoal-600 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* 메인 버튼: 한 개만, 텍스트만 바뀜 */}
              <button
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handlePrimaryAction}
                disabled={!canRequestQuote || quote.status === 'loading' || isRedirecting}
              >
                {buttonLabel}
              </button>

              {/* 상태 메시지 */}
              {formError && (
                <p className="mt-3 font-sans text-xs text-red-500">
                  {formError}
                </p>
              )}

              {quote.status === 'error' && !formError && (
                <p className="mt-3 font-sans text-xs text-red-500">
                  {quote.message}
                </p>
              )}

              {quote.status === 'success' && !quote.data.isValid && (
                <p className="mt-3 font-sans text-xs text-charcoal-600">
                  ⚠️ {quote.data.reason}
                </p>
              )}

              {quote.status === 'idle' && (
                <p className="mt-3 font-sans text-xs text-charcoal-500">
                  Select your dates and number of guests to check availability
                  and see the total price.
                </p>
              )}

              {isQuoteValid && (
                <p className="mt-3 font-sans text-xs text-charcoal-500">
                  First click checks availability. Second click continues to
                  secure Stripe payment with your details.
                </p>
              )}

              {/* 결제 로고 */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <span className="font-sans text-xs text-charcoal-400">
                  Secured by
                </span>
                <svg
                  className="h-5 text-charcoal-400"
                  viewBox="0 0 60 25"
                  fill="currentColor"
                >
                  <path d="M8.5 8.5h3l-1.5 9h-3l1.5-9zm13.2 0c-1.4 0-2.4.7-3 1.8l-4.2-1.8h-2.5l-1.5 9h3l.8-5.2c.2-1 .9-1.5 1.7-1.5.7 0 1.1.4 1 1.1l-.9 5.6h3l.9-5.6c.3-2.1-.9-3.4-2.3-3.4zm8 0c-2.7 0-4.7 2-5.2 4.5-.5 2.5.9 4.5 3.6 4.5 1.3 0 2.5-.5 3.4-1.2l-.8-2c-.6.5-1.3.8-2 .8-1.1 0-1.6-.6-1.4-1.6h4.9c.7-2.7-.4-5-2.5-5zm-.3 2.3c.6 0 .9.4.8 1h-2.4c.3-.6.9-1 1.6-1zm10.6-2.3c-1 0-1.8.5-2.3 1.2l.2-1h-2.8l-1.5 9h3l.7-4.5c.2-1.3 1-2 2-2 .3 0 .6 0 .9.1l.5-2.7c-.2-.1-.5-.1-.7-.1z" />
                </svg>
                <div className="flex gap-2">
                  <div className="w-8 h-5 bg-stone-200 rounded flex items-center justify-center">
                    <span className="text-xs text-charcoal-400">V</span>
                  </div>
                  <div className="w-8 h-5 bg-stone-200 rounded flex items-center justify-center">
                    <span className="text-xs text-charcoal-400">M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}