'use client';

import { useState, useEffect } from 'react';
import { PanelLeft, PanelLeftClose, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

type NavigationLevel = 'main' | 'categories' | 'services';

const slideInStyle = `
  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .slide-in {
    animation: slideInFromRight 0.3s ease-out forwards;
  }
`;

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const [isOverHero, setIsOverHero] = useState(true);
  const [navigationLevel, setNavigationLevel] = useState<NavigationLevel>('main');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const serviceCategories = {
    diagnostics: {
      label: 'Diagnostics',
      services: [
        { label: 'Blood Panels', href: 'https://thewellnesslondon.com/services/blood-tests' },
        { label: 'Private GP', href: 'https://thewellnesslondon.com/services/private-gp' },
        { label: 'Medical Imaging', href: 'https://thewellnesslondon.com/services/medical-imaging' },
      ]
    },
    treatments: {
      label: 'Treatments',
      services: [
        { label: 'PRP Therapy', href: 'https://thewellnesslondon.com/services/prp' },
        { label: 'PRF Therapy', href: 'https://thewellnesslondon.com/services/prf' },
        { label: 'IV Therapy', href: 'https://thewellnesslondon.com/services/iv-therapy' },
        { label: 'Weight Optimisation', href: 'https://thewellnesslondon.com/services/weight-loss' },
        { label: 'Facials', href: 'https://thewellnesslondon.com/services/facials' },
        { label: 'Prescription Refills', href: 'https://thewellnesslondon.com/services/prescription-refills' },
      ]
    },
    specialty: {
      label: 'Specialty',
      services: [
        { label: 'Hormone Therapy', href: 'https://thewellnesslondon.com/services/hormone-therapy' },
        { label: 'ADHD & Autism', href: 'https://thewellnesslondon.com/services/adhd-autism' },
        { label: 'Wedding Programme', href: 'https://thewellnesslondon.com/services/wedding-programme' },
        { label: 'Erectile Dysfunction', href: 'https://thewellnesslondon.com/services/erectile-dysfunction' },
        { label: 'Mental Health', href: 'https://thewellnesslondon.com/services/mental-health' },
        { label: 'Fertility & IVF', href: 'https://thewellnesslondon.com/services/fertility-ivf' },
      ]
    },
    other: {
      label: 'Other',
      services: [
        { label: 'Gut Microbiome', href: 'https://thewellnesslondon.com/services/gut-microbiome' },
        { label: 'Sleep Clinic', href: 'https://thewellnesslondon.com/services/sleep-clinic' },
        { label: 'Long COVID', href: 'https://thewellnesslondon.com/services/long-covid' },
        { label: 'Executive Health', href: 'https://thewellnesslondon.com/services/executive-assessment' },
        { label: 'Fit to Fly', href: 'https://thewellnesslondon.com/services/fit-to-fly' },
        { label: 'Driver Medicals', href: 'https://thewellnesslondon.com/services/driver-medicals' },
      ]
    }
  };

  const navItems = [
    { id: 'ai-doctor', label: 'AI Doctor', href: 'https://thewellnesslondon.com/ai-doctor' },
    { id: 'health-check', label: 'Health Check', href: 'https://thewellnesslondon.com/services/executive-assessment' },
    { id: 'shop', label: 'Shop', href: 'https://thewellnesslondon.com/shop' },
    { id: 'about', label: 'About', href: 'https://thewellnesslondon.com/about' },
    { id: 'enquire', label: 'Enquire', href: 'https://thewellnesslondon.com/enquire' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Hero section is typically the viewport height
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      // If we're within the first viewport height, we're over the hero
      setIsOverHero(scrollPosition < heroHeight - 100);
    };

    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset navigation to main level when sidebar closes
  useEffect(() => {
    if (!isOpen) {
      setNavigationLevel('main');
      setSelectedCategory(null);
    }
  }, [isOpen]);

  return (
    <>
      {/* Inject slide animation styles */}
      <style>{slideInStyle}</style>

      {/* Sidebar - Full width on mobile (overlay), fixed width on desktop (push) */}
      <div
        className={`fixed left-0 bg-white transition-all duration-200 ease-out overflow-y-auto ${
          isOpen ? 'w-full lg:w-[260px] z-50' : 'w-0 z-40'
        }`}
        style={{
          top: '64px',
          height: 'calc(100vh - 64px)',
        }}
      >
        {/* Navigation */}
        <nav className="h-full flex items-center" style={{ paddingLeft: '40px', paddingRight: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>

            {/* Back Button (shown when not on main level) */}
            {navigationLevel !== 'main' && (
              <button
                onClick={() => {
                  if (navigationLevel === 'services') {
                    setNavigationLevel('categories');
                    setSelectedCategory(null);
                  } else if (navigationLevel === 'categories') {
                    setNavigationLevel('main');
                  }
                }}
                className="slide-in flex items-center gap-2 font-normal text-gray-900 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                style={{ fontSize: '16px', marginBottom: '8px' }}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}

            {/* MAIN MENU LEVEL */}
            {navigationLevel === 'main' && (
              <>
                <button
                  onClick={() => setNavigationLevel('categories')}
                  className="slide-in flex items-center justify-between font-normal text-gray-900 hover:text-gray-600 transition-colors duration-200 text-left w-full cursor-pointer"
                  style={{ fontSize: '16px' }}
                >
                  <span>Services</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {navItems.map((item, idx) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="slide-in block font-normal text-gray-900 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                    style={{ fontSize: '16px', animationDelay: `${(idx + 1) * 0.05}s` }}
                    onClick={() => {
                      // Close sidebar on mobile after clicking
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}

            {/* CATEGORIES LEVEL */}
            {navigationLevel === 'categories' && (
              <>
                {Object.entries(serviceCategories).map(([key, category], idx) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedCategory(key);
                      setNavigationLevel('services');
                    }}
                    className="slide-in flex items-center justify-between font-normal text-gray-900 hover:text-gray-600 transition-colors duration-200 text-left w-full cursor-pointer"
                    style={{ fontSize: '16px', animationDelay: `${idx * 0.05}s` }}
                  >
                    <span>{category.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </>
            )}

            {/* SERVICES LEVEL */}
            {navigationLevel === 'services' && selectedCategory && (
              <>
                {serviceCategories[selectedCategory as keyof typeof serviceCategories].services.map((service, idx) => (
                  <Link
                    key={idx}
                    href={service.href}
                    className="slide-in block font-normal text-gray-900 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                    style={{ fontSize: '16px', animationDelay: `${idx * 0.05}s` }}
                    onClick={() => {
                      // Close sidebar on mobile after clicking
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                      // Reset to main menu
                      setNavigationLevel('main');
                      setSelectedCategory(null);
                    }}
                  >
                    {service.label}
                  </Link>
                ))}
              </>
            )}

          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
