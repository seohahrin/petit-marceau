// src/components/sections/StudioSection.tsx

export default function StudioSection() {
  return (
    <section id="studio" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Title */}
          <div className="lg:col-span-4">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-muted mb-4">
              01
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal-900 mb-6">
              The Studio
            </h2>
            <p
              className="font-serif text-lg text-charcoal-600 italic leading-relaxed"
              id="studio-description"
            >
              A 16m² Parisian space in white and oak tones.
            </p>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-8">
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="image-container aspect-[4/5] bg-stone-200 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                  <span className="font-sans text-xs tracking-widest uppercase text-stone-400">
                    Interior
                  </span>
                </div>
              </div>
              <div className="image-container aspect-[4/5] bg-stone-200 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                  <span className="font-sans text-xs tracking-widest uppercase text-stone-400">
                    Window View
                  </span>
                </div>
              </div>
              <div className="image-container aspect-[4/3] bg-stone-200 relative col-span-2">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                  <span className="font-sans text-xs tracking-widest uppercase text-stone-400">
                    Living Space
                  </span>
                </div>
              </div>
            </div>

            {/* Amenities List */}
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
              <div className="flex items-center gap-4 py-3 border-b border-stone-200">
                <span className="w-1 h-1 bg-gold-muted rounded-full" />
                <span className="font-sans text-sm text-charcoal-800">
                  16m² minimalist studio
                </span>
              </div>
              <div className="flex items-center gap-4 py-3 border-b border-stone-200">
                <span className="w-1 h-1 bg-gold-muted rounded-full" />
                <span className="font-sans text-sm text-charcoal-800">
                  Double sofa-bed (max 2 guests)
                </span>
              </div>
              <div className="flex items-center gap-4 py-3 border-b border-stone-200">
                <span className="w-1 h-1 bg-gold-muted rounded-full" />
                <span className="font-sans text-sm text-charcoal-800">
                  Fully equipped kitchen
                </span>
              </div>
              <div className="flex items-center gap-4 py-3 border-b border-stone-200">
                <span className="w-1 h-1 bg-gold-muted rounded-full" />
                <span className="font-sans text-sm text-charcoal-800">
                  Shower bathroom
                </span>
              </div>
              <div className="flex items-center gap-4 py-3 border-b border-stone-200">
                <span className="w-1 h-1 bg-gold-muted rounded-full" />
                <span className="font-sans text-sm text-charcoal-800">
                  Washer–dryer
                </span>
              </div>
              <div className="flex items-center gap-4 py-3 border-b border-stone-200">
                <span className="w-1 h-1 bg-gold-muted rounded-full" />
                <span className="font-sans text-sm text-charcoal-800">
                  Workspace
                </span>
              </div>
              <div className="flex items-center gap-4 py-3 border-b border-stone-200">
                <span className="w-1 h-1 bg-gold-muted rounded-full" />
                <span className="font-sans text-sm text-charcoal-800">
                  High-speed Wi-Fi (314 Mbps)
                </span>
              </div>
              <div className="flex items-center gap-4 py-3 border-b border-stone-200">
                <span className="w-1 h-1 bg-gold-muted rounded-full" />
                <span className="font-sans text-sm text-charcoal-800">
                  Bed linen & towels included
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}