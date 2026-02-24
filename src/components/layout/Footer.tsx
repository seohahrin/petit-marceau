// src/components/layout/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-stone-300 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <svg
                className="w-8 h-8 text-stone-400"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
              >
                <path d="M16 2 L16 30" />
                <path d="M16 6 L12 14 L20 14 L16 6" />
                <path d="M10 14 L16 30 L22 14" />
                <path d="M11 20 L21 20" />
                <path d="M12 26 L20 26" />
                <path d="M8 30 L24 30" />
              </svg>
              <span className="font-serif text-xl tracking-wide text-stone-100">
                Petit Marceau
              </span>
            </div>
            <p className="font-sans text-sm text-stone-500 leading-relaxed mb-4">
              34 Avenue Marceau
              <br />
              75008 Paris, France
            </p>
            <a
              href="mailto:contact@petitmarceau.paris"
              className="font-sans text-sm text-stone-400 hover:text-stone-200 transition-colors"
            >
              contact@petitmarceau.paris
            </a>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-4">
            <p className="font-sans text-xs tracking-widest uppercase text-stone-500 mb-4">
              Navigation
            </p>
            <nav className="grid grid-cols-2 gap-3">
              <a
                href="#studio"
                className="font-sans text-sm text-stone-400 hover:text-stone-200 transition-colors"
              >
                The Studio
              </a>
              <a
                href="#booking"
                className="font-sans text-sm text-stone-400 hover:text-stone-200 transition-colors"
              >
                Booking
              </a>
              <a
                href="#location"
                className="font-sans text-sm text-stone-400 hover:text-stone-200 transition-colors"
              >
                Location
              </a>
              <a
                href="#reviews"
                className="font-sans text-sm text-stone-400 hover:text-stone-200 transition-colors"
              >
                Reviews
              </a>
              <a
                href="#view"
                className="font-sans text-sm text-stone-400 hover:text-stone-200 transition-colors"
              >
                Eiffel View
              </a>
              <a
                href="#faq"
                className="font-sans text-sm text-stone-400 hover:text-stone-200 transition-colors"
              >
                FAQ
              </a>
            </nav>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-4">
            <p className="font-sans text-xs tracking-widest uppercase text-stone-500 mb-4">
              Legal
            </p>
            <nav className="space-y-3">
              <a
                href="#"
                className="block font-sans text-sm text-stone-400 hover:text-stone-200 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block font-sans text-sm text-stone-400 hover:text-stone-200 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="block font-sans text-sm text-stone-400 hover:text-stone-200 transition-colors"
              >
                Cookie Policy
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-charcoal-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="font-sans text-xs text-stone-600">
              <p>Registration: 75108XXXXXX · SIRET: XXX XXX XXX XXXXX</p>
              <p className="mt-1">
                © 2025 Petit Marceau. All rights reserved.
              </p>
            </div>
            <p className="font-sans text-xs text-stone-600">
              GDPR Compliant · Data processed in EU
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}