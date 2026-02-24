// src/components/layout/Header.tsx
'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const wrapper = document.querySelector('.app-wrapper');

    if (!wrapper) return;

    const onScroll = () => {
      const top =
        (wrapper as HTMLElement).scrollTop ?? window.scrollY;
      setScrolled(top > 50);
    };

    wrapper.addEventListener('scroll', onScroll);
    return () => {
      wrapper.removeEventListener('scroll', onScroll);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-stone-50/95 backdrop-blur-sm ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 border-b border-stone-300/50">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
            <svg
              className="w-8 h-8 text-charcoal-900 transition-transform duration-500 group-hover:scale-105"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            >
              {/* Antenna */}
              <line x1="16" y1="1.5" x2="16" y2="3.5" />

              {/* Upper narrowing structure */}
              <path d="M16 3.5 L14 8 L13 12" />
              <path d="M16 3.5 L18 8 L19 12" />

              {/* Second platform */}
              <line x1="12.5" y1="12" x2="19.5" y2="12" />

              {/* Lower structure */}
              <path d="M13 12 L9 22 L6 30" />
              <path d="M19 12 L23 22 L26 30" />

              {/* First platform */}
              <line x1="10" y1="20" x2="22" y2="20" />

              {/* Signature arch */}
              <path d="M7 30 Q16 24 25 30" fill="none" />

            </svg>
              <span
                className="font-serif text-xl tracking-wide text-charcoal-900"
                id="logo-text"
              >
                Petit Marceau
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              <a
                href="#studio"
                className="nav-link font-sans text-xs tracking-widest uppercase text-charcoal-800"
              >
                The Studio
              </a>
              <a
                href="#location"
                className="nav-link font-sans text-xs tracking-widest uppercase text-charcoal-800"
              >
                Location
              </a>
              <a
                href="#view"
                className="nav-link font-sans text-xs tracking-widest uppercase text-charcoal-800"
              >
                Eiffel View
              </a>
              <a
                href="#reviews"
                className="nav-link font-sans text-xs tracking-widest uppercase text-charcoal-800"
              >
                Reviews
              </a>
              <a
                href="#booking"
                className="nav-link font-sans text-xs tracking-widest uppercase text-charcoal-800"
              >
                Booking
              </a>
              <a
                href="#faq"
                className="nav-link font-sans text-xs tracking-widest uppercase text-charcoal-800"
              >
                FAQ
              </a>
            </nav>

            {/* Language Switch + Mobile Menu */}
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-2 text-xs tracking-wider text-charcoal-600">
                <button className="hover:text-charcoal-900 transition-colors font-medium">
                  EN
                </button>
                <span className="text-stone-400">·</span>
                <button className="hover:text-charcoal-900 transition-colors">
                  FR
                </button>
                <span className="text-stone-400">·</span>
                <button className="hover:text-charcoal-900 transition-colors">
                  KR
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                id="mobile-menu-btn"
                className="lg:hidden p-2"
                aria-label="Menu"
                onClick={openMenu}
              >
                <svg
                  className="w-6 h-6 text-charcoal-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`mobile-menu fixed inset-0 z-50 bg-stone-50 lg:hidden ${
          menuOpen ? 'active' : ''
        }`}
      >
        <div className="flex flex-col h-full px-6 py-8">
          <div className="flex justify-between items-center mb-16">
            <span className="font-serif text-xl tracking-wide text-charcoal-900">
              Petit Marceau
            </span>
            <button
              id="close-menu-btn"
              className="p-2"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <svg
                className="w-6 h-6 text-charcoal-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            <a
              href="#studio"
              className="nav-link text-charcoal-800"
            >
              The Studio
            </a>
            <a
              href="#location"
              className="nav-link text-charcoal-800"
            >
              Location
            </a>
            <a
              href="#view"
              className="nav-link text-charcoal-800"
            >
              Eiffel View
            </a>
            <a
              href="#reviews"
              className="nav-link text-charcoal-800"
            >
              Reviews
            </a>
            <a
              href="#booking"
              className="nav-link text-charcoal-800"
            >
              Booking
            </a>
            <a
              href="#faq"
              className="nav-link text-charcoal-800"
            >
              FAQ
            </a>
          </nav>

          <div className="mt-auto flex gap-4 text-sm tracking-wider text-charcoal-600">
            <button className="font-medium">EN</button>
            <span>·</span>
            <button>FR</button>
            <span>·</span>
            <button>KR</button>
          </div>
        </div>
      </div>
    </>
  );
}