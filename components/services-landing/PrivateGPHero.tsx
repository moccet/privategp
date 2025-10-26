'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './PrivateGPHero.module.css';

interface PrivateGPHeroProps {
  onBookingClick?: () => void;
}

export default function PrivateGPHero({ onBookingClick }: PrivateGPHeroProps) {
  const [isHoveringPrimary, setIsHoveringPrimary] = useState(false);
  const [isHoveringSecondary, setIsHoveringSecondary] = useState(false);

  const handleExploreOptions = () => {
    // Scroll to options section or navigate
    const section = document.getElementById('options');
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
            <em>Expert</em> Medical Care, Without the Wait
          </h1>

          <p className={styles.description}>
            Connect with highly qualified, GMC-registered doctors in as little as 15 minutes for
            comprehensive health consultations. From immediate prescriptions to priority specialist
            referrals, receive the responsive, professional care that busy lives demand with none of
            the delays.
          </p>

          <div className={styles.buttons}>
            <button
              className={styles.primaryButton}
              onMouseEnter={() => setIsHoveringPrimary(true)}
              onMouseLeave={() => setIsHoveringPrimary(false)}
              onClick={onBookingClick}
            >
              Book a consultation
            </button>

            <button
              className={styles.secondaryButton}
              onMouseEnter={() => setIsHoveringSecondary(true)}
              onMouseLeave={() => setIsHoveringSecondary(false)}
              onClick={handleExploreOptions}
            >
              Explore our options
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
              src="/images/gp/1.jpeg"
              alt="Luxury private GP consultation room"
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
