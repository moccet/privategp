'use client';

import { useState } from 'react';
import { Playfair_Display } from 'next/font/google';
import PrivateGPHero from '@/components/services-landing/PrivateGPHero';
import ConsultationOptionsSection from '@/components/services-landing/ConsultationOptionsSection';
import ConsultationCardsSection from '@/components/services-landing/ConsultationCardsSection';
import WhyChoosePrivateGPSection from '@/components/services-landing/WhyChoosePrivateGPSection';
import CommonConditionsSection from '@/components/services-landing/CommonConditionsSection';
import PrivateGPFAQSection from '@/components/services-landing/PrivateGPFAQSection';
import FooterSection from '@/components/testing-landing/FooterSection';
import BookingSidePanel from '@/components/BookingSidePanel';
import StructuredData from '@/components/StructuredData';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
});

export default function PrivateGPPage() {
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookingClick = (consultationCode: string) => {
    setSelectedConsultation(consultationCode);
    setIsBookingOpen(true);
  };

  return (
    <div className={`min-h-screen bg-white ${playfair.variable}`}>
      {/* SEO: Structured Data for Search Engines */}
      <StructuredData />

      <style jsx global>{`
        :root {
          --font-playfair: ${playfair.style.fontFamily};
        }
      `}</style>

      {/* Hero Section */}
      <PrivateGPHero onBookingClick={() => handleBookingClick('private-gp')} />

      {/* Consultation Options Section */}
      <ConsultationOptionsSection />

      {/* Consultation Cards Section */}
      <ConsultationCardsSection onBookingClick={handleBookingClick} />

      {/* Why Choose Private GP Section */}
      <WhyChoosePrivateGPSection onBookingClick={() => handleBookingClick('private-gp')} />

      {/* Common Conditions Section */}
      <CommonConditionsSection />

      {/* FAQ Section */}
      <PrivateGPFAQSection />

      {/* Footer */}
      <FooterSection />

      {/* Booking Side Panel */}
      <BookingSidePanel
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedConsultation(null);
        }}
        service={selectedConsultation}
      />
    </div>
  );
}
