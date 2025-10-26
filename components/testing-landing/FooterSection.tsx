'use client';

import Image from 'next/image';
import Link from 'next/link';

const FooterSection = () => {
  return (
    <footer className="relative bg-[#1a1a5e] text-white" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="px-6 md:px-16 lg:px-24" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
        <div style={{ marginBottom: '64px' }}>
          {/* Navigation Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '32px', maxWidth: '64rem', margin: '0 auto' }}>

            {/* Learn Column */}
            <div>
              <h3 className="font-light" style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '24px' }}>Learn</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Medical Imaging', href: '/en/services/medical-imaging' },
                  { label: 'Same Day GP', href: '/en/services/private-gp' },
                  { label: 'Medical Facials', href: '/en/services/aesthetic-treatments' },
                  { label: 'Weight Loss', href: '/en/services/weight-loss' },
                  { label: 'Executive Health', href: '/services/executive-assessment' },
                  { label: 'Gut Microbiome', href: '/en/services/gut-microbiome' },
                  { label: 'Hair Loss', href: '/en/services/mens-health' },
                  { label: 'IV Therapy', href: '/en/services/iv-therapy' },
                  { label: 'Sleep Clinic', href: '/en/services/sleep-clinic' },
                  { label: 'Prescription Refill', href: '/en/services/prescription-refills' }
                ].map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-sm font-light hover:opacity-70 transition-opacity" style={{ lineHeight: '1.7' }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Column */}
            <div>
              <h3 className="font-light" style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '24px' }}>Popular</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Lifestyle Panel', href: '/en/services/blood-tests' },
                  { label: 'GP – Same Day Urgent', href: '/en/services/private-gp' },
                  { label: 'IV – Immunity Shield', href: '/en/services/iv-therapy' },
                  { label: 'Full Body MRI', href: '/en/services/medical-imaging' },
                  { label: 'Echocardiogramm', href: '/en/services/medical-imaging' },
                  { label: 'GLP-1 Programme', href: '/en/services/weight-loss' },
                  { label: 'Sildenafil', href: '/en/services/erectile-dysfunction' },
                  { label: 'Repeat Prescription Programme', href: '/en/services/prescription-refills' },
                  { label: 'Gut Microbiome', href: '/en/services/gut-microbiome' },
                  { label: 'Viagra Connect', href: '/en/services/erectile-dysfunction' },
                  { label: 'Paediatric Sleep Clinic', href: '/en/services/sleep-clinic' }
                ].map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-sm font-light hover:opacity-70 transition-opacity" style={{ lineHeight: '1.7' }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Wellness Column */}
            <div>
              <h3 className="font-light" style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '24px' }}>The Wellness</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Careers', href: '/internship' },
                  { label: 'Connect', href: '/contact' }
                ].map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-sm font-light hover:opacity-70 transition-opacity" style={{ lineHeight: '1.7' }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/ai-doctor" className="text-sm font-light hover:opacity-70 transition-opacity" style={{ lineHeight: '1.7' }}>
                    Integrated <strong>moccet</strong>® AI technology
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center" style={{ gap: '24px', marginBottom: '48px' }}>
          {[
            { name: 'LinkedIn', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', href: 'https://www.linkedin.com/company/105720763' },
            { name: 'X', icon: 'M4 4l11.733 16H20L8.267 4z M4 20l6.768-6.768m2.46-2.46L20 4', href: 'https://x.com/TheWellness_ldn' },
            { name: 'Instagram', icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z', href: 'https://www.instagram.com/thewellness.london/#' },
            { name: 'TikTok', icon: 'M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5', href: 'https://www.tiktok.com/@thewellness.london' }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label={social.name}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>

        {/* Bottom Links */}
        <div style={{ paddingTop: '32px' }}>
          <div className="flex flex-wrap justify-center text-sm font-light" style={{ gap: '24px' }}>
            <Link href="/privacy" className="hover:opacity-70 transition-opacity">Privacy policy</Link>
            <Link href="/data-deletion" className="hover:opacity-70 transition-opacity">Consumer Health Data Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Large Logo Section */}
      <div className="relative overflow-hidden bg-[#1a1a5e]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="flex items-center justify-center">
          <h1
            className="text-center opacity-20"
            style={{
              fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              fontWeight: '400',
              lineHeight: '1',
              color: '#4a4a8e'
            }}
          >
            The Wellness
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
