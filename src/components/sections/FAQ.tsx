// src/components/sections/FaqSection.tsx
'use client';

import { useState } from 'react';

const items = [
  {
    q: 'What are the check-in and check-out times?',
    a: 'Check-in is from 3:00 PM. Check-out is by 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability.',
  },
  {
    q: 'Is the studio suitable for children?',
    a: 'The studio is designed for 1–2 adult guests. The sofa-bed configuration is best suited for adults or couples seeking a quiet, refined stay.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Free cancellation up to 7 days before check-in. Cancellations within 7 days are non-refundable. Please refer to your booking confirmation for specific terms.',
  },
  {
    q: 'Is parking available?',
    a: 'On-site parking is not available. Public parking garages are located nearby on Avenue George V. The area is well-served by metro and taxi.',
  },
  {
    q: 'How do I access the building?',
    a: 'We offer in-person check-in at a mutually convenient time. You will receive building access codes and detailed instructions 24 hours before arrival.',
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-4">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-muted mb-4">
              07
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal-900 mb-6">
              FAQ
            </h2>
            <p className="font-serif text-lg text-charcoal-600 italic">
              Frequently asked questions about your stay.
            </p>
          </div>

          {/* Right Column - Accordion */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {items.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={item.q}
                    className={`faq-item border-b border-stone-200 ${
                      isActive ? 'active' : ''
                    }`}
                  >
                    <button
                      className="faq-trigger w-full flex items-center justify-between py-6 text-left"
                      onClick={() =>
                        setActiveIndex(isActive ? null : index)
                      }
                    >
                      <span className="font-sans text-sm font-medium text-charcoal-800">
                        {item.q}
                      </span>
                      <span className="faq-icon text-charcoal-400 text-xl font-light">
                        +
                      </span>
                    </button>
                    <div className="faq-content">
                      <p className="font-sans text-sm text-charcoal-600 pb-6 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}