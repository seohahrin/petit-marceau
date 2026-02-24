// src/components/sections/Location.tsx

import Image from "next/image";

export default function LocationSection() {
  return (
    <section id="location" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column */}
          <div className="lg:col-span-5">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold-muted mb-4">
            03
          </p>

          <h2 className="font-serif text-[40px] lg:text-[46px] leading-[1.05] text-[#2D2D2D] mb-4">
            Location
          </h2>

          <p className="font-serif text-[17px] text-[#6C6C6C] italic leading-relaxed mb-8">
            Prime 8th arrondissement.
          </p>

            <div className="space-y-6">
              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-charcoal-400 mb-3">
                  Walking Distance
                </p>
                <ul className="space-y-2">
                  <li className="font-sans text-sm text-charcoal-700">
                    Arc de Triomphe
                  </li>
                  <li className="font-sans text-sm text-charcoal-700">
                    Champs-Élysées
                  </li>
                  <li className="font-sans text-sm text-charcoal-700">
                    Seine River
                  </li>
                </ul>
              </div>

              <div className="h-px bg-stone-200" />

              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-charcoal-400 mb-3">
                  Metro
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-medium bg-[#2D2D2D] text-[#FDFCFA]">
                      1
                    </span>
                    <span className="font-sans text-sm text-charcoal-700">
                      George V
                    </span>
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-medium bg-[#525252] text-[#FDFCFA]">
                      9
                    </span>
                    <span className="font-sans text-sm text-charcoal-700">
                      Alma-Marceau
                    </span>
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-medium bg-[#B8A88A] text-[#FDFCFA]">
                      A
                    </span>
                    <span className="font-sans text-sm text-charcoal-700">
                      Charles de Gaulle–Étoile
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Image Map */}
          {/* <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" /> */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden shadow-sm rounded-none">
              <Image
                src="/map.png"
                alt="Map showing 34 Avenue Marceau near Arc de Triomphe and Seine"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}