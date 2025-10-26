'use client';

import { useState } from 'react';
import { Playfair_Display } from 'next/font/google';
import TopBar from '@/components/TopBar';
import Sidebar from '@/components/testing-landing/Sidebar';
import BloodTestsHero from '@/components/services-landing/BloodTestsHero';
import BloodTestPackagesOverview from '@/components/services-landing/BloodTestPackagesOverview';
import BloodTestPanelCard from '@/components/services-landing/BloodTestPanelCard';
import HowItWorksSection from '@/components/services-landing/HowItWorksSection';
import DetectPreventRelaxSection from '@/components/services-landing/DetectPreventRelaxSection';
import FAQSection from '@/components/services-landing/FAQSection';
import FooterSection from '@/components/testing-landing/FooterSection';
import BookingSidePanel from '@/components/BookingSidePanel';
import StructuredData from '@/components/StructuredData';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
});

export default function BloodTestsPage() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBookingClick = (testCode: string) => {
    setSelectedTest(testCode);
    setIsBookingOpen(true);
  };

  return (
    <div className={`min-h-screen bg-white ${playfair.variable}`}>
      {/* SEO: Structured Data for Search Engines and AI */}
      <StructuredData />

      <style jsx global>{`
        :root {
          --font-playfair: ${playfair.style.fontFamily};
        }
      `}</style>

      {/* TopBar */}
      <TopBar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content with Sidebar Margin */}
      <div
        className={`transition-all duration-200 ${
          isSidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-0'
        }`}
        style={{ marginTop: '64px' }}
      >

      {/* Hero Section */}
      <BloodTestsHero onBookingClick={() => handleBookingClick('blood-tests')} />

      {/* Blood Test Packages Overview */}
      <BloodTestPackagesOverview />

      {/* Lifestyle Panel */}
      <BloodTestPanelCard
        title="Lifestyle Panel"
        price="£400"
        markers="37 markers"
        duration="30 minutes"
        includedItems={[
          'Full Blood Count',
          'Liver Function',
          'Kidney Function',
          'Cholesterol Profile',
          'Diabetes Screen',
          'Vitamin D & B12',
          'Iron Studies',
          'Inflammation Markers',
        ]}
        imagePath="/images/bloods/2.jpg"
        imageAlt="Lifestyle Panel - Core health markers and biomarker testing"
        ctaText="Book Now"
        onBookingClick={() => handleBookingClick('lifestyle-panel')}
        buttonColor="#E5A0B0"
        reverse={true}
      />

      {/* Hormone Panel */}
      <BloodTestPanelCard
        title="Hormone Panel"
        price="£500"
        markers="52 markers"
        duration="30 minutes"
        includedItems={[
          'Lifestyle Panel',
          'Full Thyroid Panel',
          'Sex Hormones (Male/Female)',
          'Fertility Markers',
          'DHEA & Testosterone',
          'Metabolic Hormones',
          'Pituitary Function',
        ]}
        imagePath="/images/bloods/3.jpg"
        imageAlt="Hormone Panel - Comprehensive hormonal health testing"
        ctaText="Book Now"
        onBookingClick={() => handleBookingClick('lifestyle-hormone')}
      />

      {/* Executive Panel */}
      <BloodTestPanelCard
        title="Executive Panel"
        price="£650"
        markers="60+ markers"
        duration="45 minutes"
        includedItems={[
          'Hormone Panel',
          'Cortisol & Stress Hormones',
          'Advanced Cardiac Markers',
          'Cancer Screening Markers',
          'Autoimmune Panel',
          'Advanced Vitamins & Minerals',
          'Gut Health Markers',
          'Genetic Risk Factors',
          'Longevity Biomarkers',
        ]}
        imagePath="/images/bloods/4.jpg"
        imageAlt="Executive Panel - Comprehensive executive health screening"
        ctaText="Book Now"
        onBookingClick={() => handleBookingClick('advanced-panel')}
        buttonColor="#E5A07E"
        reverse={true}
      />

      {/* How it Works Section */}
      <HowItWorksSection />

      {/* Detect. Prevent. Relax. Section */}
      <DetectPreventRelaxSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <FooterSection />
      </div>

      {/* Booking Side Panel */}
      <BookingSidePanel
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedTest(null);
        }}
        service={selectedTest}
      />
    </div>
  );
}
