'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './BloodTestsHero.module.css';

interface BloodTestsHeroProps {
  onBookingClick?: () => void;
}

export default function BloodTestsHero({ onBookingClick }: BloodTestsHeroProps) {
  const [isHoveringPrimary, setIsHoveringPrimary] = useState(false);
  const [isHoveringSecondary, setIsHoveringSecondary] = useState(false);

  const handleExplorePanels = () => {
    // Scroll to panels section or navigate to panels page
    const section = document.getElementById('panels');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Left Column - Content */}
        <div className={styles.content}>
          <h1 className={styles.title}>
            Blood Tests & Biomarker Analysis
          </h1>

          <p className={styles.description}>
            Comprehensive private blood testing with detailed health insights. Get a complete picture of your health with our advanced diagnostic panels.
          </p>

          <div className={styles.buttons}>
            <button
              className={styles.primaryButton}
              onMouseEnter={() => setIsHoveringPrimary(true)}
              onMouseLeave={() => setIsHoveringPrimary(false)}
              onClick={onBookingClick}
            >
              Book Now
            </button>

            <button
              className={styles.secondaryButton}
              onMouseEnter={() => setIsHoveringSecondary(true)}
              onMouseLeave={() => setIsHoveringSecondary(false)}
              onClick={handleExplorePanels}
            >
              Explore our panels
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.arrow}
                style={{
                  transform: isHoveringSecondary ? 'translateX(4px)' : 'translateX(0)',
                }}
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/bloods/1.jpg"
              alt="Blood tests and biomarker analysis"
              width={800}
              height={600}
              className={styles.image}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
