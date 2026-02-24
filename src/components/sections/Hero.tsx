// src/components/sections/Hero.tsx

export default function Hero() {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Text Block */}
        <div className="max-w-3xl">
          <p
            className="font-sans text-xs tracking-widest uppercase text-charcoal-600 mb-6"
            id="hero-label"
          >
            Paris · Avenue Marceau VIII<sup>e</sup>
          </p>
          <h1
            className="font-serif text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-light text-charcoal-900 leading-none mb-8"
            id="hero-title"
          >
            Petit
            <br />
            Marceau
          </h1>
          <p
            className="font-serif text-xl sm:text-2xl lg:text-3xl font-light text-charcoal-700 italic mb-12 max-w-xl leading-relaxed"
            id="hero-subtitle"
          >
            A quiet Parisian studio overlooking the Eiffel Tower.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* ✅ 색상/폰트/대문자/letter-spacing은 globals.css의 .btn-primary가 담당 */}
            <a href="#booking" className="btn-primary">
              Check Availability
            </a>

            <a href="#studio" className="btn-secondary">
              Explore the Studio
            </a>
          </div>
        </div>
      </div>

      {/* 아래 hero 이미지 부분은 그대로 유지 */}
      <div className="mt-16 lg:mt-24">
        <div className="image-container w-full h-64 sm:h-80 lg:h-[28rem] xl:h-[32rem] bg-stone-200 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-300 via-stone-200 to-stone-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-24 h-24 mx-auto text-stone-400/60 mb-4"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                >
                  <path d="M16 2 L16 30" />
                  <path d="M16 6 L12 14 L20 14 L16 6" />
                  <path d="M10 14 L16 30 L22 14" />
                  <path d="M11 20 L21 20" />
                  <path d="M12 26 L20 26" />
                  <path d="M8 30 L24 30" />
                </svg>
                <p className="font-serif text-lg text-stone-400 italic">
                  View from the 7th floor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}