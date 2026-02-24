// src/app/page.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import Hero from '@/components/sections/Hero';
import StudioSection from '@/components/sections/Studio';
import BookingPreview from '@/components/sections/BookingPreview';
import LocationSection from '@/components/sections/Location';
import ViewSection from '@/components/sections/View';
import ServicesSection from '@/components/sections/Services';
import ReviewsSection from '@/components/sections/Reviews';
import FaqSection from '@/components/sections/FAQ';

export default function HomePage() {
  return (
    <div className="app-wrapper">
      <Header />
      <main>
        <Hero />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-px bg-stone-300/60" />
        </div>
        <StudioSection />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-px bg-stone-300/60" />
        </div>
        <BookingPreview />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-px bg-stone-300/60" />
        </div>
        <LocationSection />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-px bg-stone-300/60" />
        </div>
        <ViewSection />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-px bg-stone-300/60" />
        </div>
        <ServicesSection />
        <ReviewsSection />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-px bg-stone-300/60" />
        </div>
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}