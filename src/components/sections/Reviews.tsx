// src/components/sections/ReviewsSection.tsx

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-4">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-muted mb-4">
              06
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-charcoal-900 mb-6">
              Reviews
            </h2>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif text-6xl font-light text-charcoal-900">
                4.78
              </span>
              <span className="font-sans text-sm text-charcoal-600">/ 5</span>
            </div>
            <p className="font-sans text-sm text-charcoal-500">
              63 verified reviews
            </p>

            {/* Stars */}
            <div className="flex gap-1 mt-4">
              <svg
                className="w-5 h-5 text-gold-muted"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                className="w-5 h-5 text-gold-muted"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                className="w-5 h-5 text-gold-muted"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                className="w-5 h-5 text-gold-muted"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                className="w-5 h-5 text-stone-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

          {/* Right Column - Review Cards */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Review 1 */}
              <div className="p-6 bg-stone-100/50 border-l-2 border-gold-muted">
                <p className="font-serif text-lg text-charcoal-700 italic leading-relaxed mb-4">
                  &quot;The view of the Eiffel Tower is simply breathtaking.
                  Worth every moment.&quot;
                </p>
                <div>
                  <p className="font-sans text-sm font-medium text-charcoal-800">
                    Marie L.
                  </p>
                  <p className="font-sans text-xs text-charcoal-500">
                    Paris, France · October 2024
                  </p>
                </div>
              </div>

              {/* Review 2 */}
              <div className="p-6 bg-stone-100/50 border-l-2 border-gold-muted">
                <p className="font-serif text-lg text-charcoal-700 italic leading-relaxed mb-4">
                  &quot;Impeccably clean. The attention to detail reminded me of
                  a boutique hotel.&quot;
                </p>
                <div>
                  <p className="font-sans text-sm font-medium text-charcoal-800">
                    James K.
                  </p>
                  <p className="font-sans text-xs text-charcoal-500">
                    London, UK · September 2024
                  </p>
                </div>
              </div>

              {/* Review 3 */}
              <div className="p-6 bg-stone-100/50 border-l-2 border-gold-muted">
                <p className="font-serif text-lg text-charcoal-700 italic leading-relaxed mb-4">
                  &quot;Perfect location. Walking distance to everything. The
                  host was exceptional.&quot;
                </p>
                <div>
                  <p className="font-sans text-sm font-medium text-charcoal-800">
                    Yuki T.
                  </p>
                  <p className="font-sans text-xs text-charcoal-500">
                    Tokyo, Japan · August 2024
                  </p>
                </div>
              </div>

              {/* Review 4 */}
              <div className="p-6 bg-stone-100/50 border-l-2 border-gold-muted">
                <p className="font-serif text-lg text-charcoal-700 italic leading-relaxed mb-4">
                  &quot;A true Parisian experience. Quiet, elegant, and
                  perfectly designed.&quot;
                </p>
                <div>
                  <p className="font-sans text-sm font-medium text-charcoal-800">
                    Sophie M.
                  </p>
                  <p className="font-sans text-xs text-charcoal-500">
                    New York, USA · July 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}