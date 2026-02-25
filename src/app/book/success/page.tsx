// src/app/book/success/page.tsx
interface SuccessPageProps {
    searchParams: { session_id?: string };
  }
  
  export default function SuccessPage({ searchParams }: SuccessPageProps) {
    return (
        <section className="min-h-[60vh] flex items-center justify-center bg-stone-50">
          <div className="max-w-md mx-auto px-6 text-center">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-muted mb-4">
              Booking Confirmed
            </p>
            <h1 className="font-serif text-3xl lg:text-4xl font-light text-charcoal-900 mb-4">
              Merci, your stay is booked.
            </h1>
            <p className="font-sans text-sm text-charcoal-600 leading-relaxed mb-6">
              A confirmation email from Stripe will be sent to you shortly.
              We’ll follow up with check-in details and access instructions.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-charcoal-900 px-6 py-3 text-xs font-sans tracking-[0.18em] uppercase text-charcoal-900 hover:bg-charcoal-900 hover:text-stone-50 transition"
            >
              Back to Home
            </a>
          </div>
        </section>
      );
    }