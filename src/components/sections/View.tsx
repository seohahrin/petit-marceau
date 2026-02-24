// src/components/sections/ViewSection.tsx

export default function ViewSection() {
  return (
    <section id="view" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12 lg:mb-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-muted mb-4">
            04
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal-900 mb-6">
            Eiffel View
          </h2>
          <p className="font-serif text-lg text-charcoal-600 italic max-w-xl">
            An elevated view above Avenue Marceau.
          </p>
        </div>

        {/* Three-image layout */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Day */}
          <div className="group">
            <div className="image-container aspect-[3/4] bg-stone-200 relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-b from-stone-100 via-stone-200 to-stone-300 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-stone-400/50 mb-2"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  >
                    <circle cx="16" cy="8" r="4" />
                    <path d="M16 2 L16 30" />
                    <path d="M16 6 L12 14 L20 14 L16 6" />
                    <path d="M10 14 L16 30 L22 14" />
                  </svg>
                  <span className="font-sans text-xs tracking-widest uppercase text-stone-400">
                    Morning
                  </span>
                </div>
              </div>
            </div>
            <p className="font-serif text-lg text-charcoal-700 italic">
              Wake up to Paris.
            </p>
          </div>

          {/* Sunset */}
          <div className="group">
            <div className="image-container aspect-[3/4] bg-stone-200 relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-b from-gold-light/30 via-stone-200 to-stone-300 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-gold-muted/60 mb-2"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  >
                    <circle cx="16" cy="8" r="4" />
                    <path d="M16 2 L16 30" />
                    <path d="M16 6 L12 14 L20 14 L16 6" />
                    <path d="M10 14 L16 30 L22 14" />
                  </svg>
                  <span className="font-sans text-xs tracking-widest uppercase text-gold-muted">
                    Sunset
                  </span>
                </div>
              </div>
            </div>
            <p className="font-serif text-lg text-charcoal-700 italic">
              Golden hour over the city.
            </p>
          </div>

          {/* Night */}
          <div className="group">
            <div className="image-container aspect-[3/4] bg-charcoal-800 relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-b from-charcoal-700 via-charcoal-800 to-charcoal-900 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-gold-muted/40 mb-2"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  >
                    <circle cx="16" cy="8" r="4" />
                    <path d="M16 2 L16 30" />
                    <path d="M16 6 L12 14 L20 14 L16 6" />
                    <path d="M10 14 L16 30 L22 14" />
                    {/* Sparkle effect */}
                    <circle cx="12" cy="12" r="0.5" fill="currentColor" />
                    <circle cx="20" cy="10" r="0.5" fill="currentColor" />
                    <circle cx="14" cy="18" r="0.5" fill="currentColor" />
                    <circle cx="18" cy="22" r="0.5" fill="currentColor" />
                  </svg>
                  <span className="font-sans text-xs tracking-widest uppercase text-gold-muted/60">
                    Night
                  </span>
                </div>
              </div>
            </div>
            <p className="font-serif text-lg text-stone-400 italic">
              La Ville Lumière.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}