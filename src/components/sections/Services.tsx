// src/components/sections/ServicesSection.tsx

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-stone-100/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-muted mb-4">
            05
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal-900">
            Services
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Elevator */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-charcoal-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1"
              >
                <rect x="4" y="2" width="16" height="20" rx="1" />
                <line x1="12" y1="2" x2="12" y2="22" />
                <path d="M7 8 L9 6 L11 8" />
                <path d="M13 16 L15 18 L17 16" />
              </svg>
            </div>
            <p className="font-sans text-xs tracking-widest uppercase text-charcoal-600">
              Elevator
            </p>
          </div>

          {/* Air Purifier */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-charcoal-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1"
              >
                <rect x="6" y="4" width="12" height="16" rx="2" />
                <circle cx="12" cy="10" r="3" />
                <path d="M10 16 h4" />
              </svg>
            </div>
            <p className="font-sans text-xs tracking-widest uppercase text-charcoal-600">
              Dyson Purifier
            </p>
          </div>

          {/* Check-in */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-charcoal-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M4 21 v-2 a4 4 0 0 1 4 -4 h8 a4 4 0 0 1 4 4 v2" />
              </svg>
            </div>
            <p className="font-sans text-xs tracking-widest uppercase text-charcoal-600">
              In-person Check-in
            </p>
          </div>

          {/* Luggage */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-charcoal-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1"
              >
                <rect x="6" y="6" width="12" height="14" rx="1" />
                <path d="M9 6 V4 a1 1 0 0 1 1 -1 h4 a1 1 0 0 1 1 1 v2" />
                <line x1="6" y1="10" x2="18" y2="10" />
              </svg>
            </div>
            <p className="font-sans text-xs tracking-widest uppercase text-charcoal-600">
              Luggage Storage
            </p>
          </div>

          {/* Secure Building */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-charcoal-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1"
              >
                <path d="M12 2 L4 6 v6 c0 5.5 3.5 10 8 11 4.5 -1 8 -5.5 8 -11 V6 Z" />
                <path d="M9 12 l2 2 4 -4" />
              </svg>
            </div>
            <p className="font-sans text-xs tracking-widest uppercase text-charcoal-600">
              Secure Building
            </p>
          </div>

          {/* High-Speed Wi-Fi */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-charcoal-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1"
              >
                <path d="M5 12.5 a7 7 0 0 1 14 0" />
                <path d="M8 15 a4 4 0 0 1 8 0" />
                <circle cx="12" cy="18" r="1" fill="currentColor" />
              </svg>
            </div>
            <p className="font-sans text-xs tracking-widest uppercase text-charcoal-600">
              314 Mbps Wi-Fi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}