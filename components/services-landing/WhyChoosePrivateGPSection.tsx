'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './WhyChoosePrivateGPSection.module.css';

interface WhyChoosePrivateGPSectionProps {
  onBookingClick?: () => void;
}

export default function WhyChoosePrivateGPSection({ onBookingClick }: WhyChoosePrivateGPSectionProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Content Column */}
        <div className={styles.content}>
          <h2 className={styles.heading}>Why Choose Private GP Care?</h2>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>15</div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>MINUTE AVERAGE WAIT</div>
                <p className={styles.statDescription}>
                  See a doctor today, not in 3 weeks. Same-day appointments always available.
                </p>
              </div>
            </div>

            <div className={styles.stat}>
              <div className={styles.statNumber}>30</div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>MINUTES WITH DOCTOR</div>
                <p className={styles.statDescription}>
                  Unhurried consultations. Time to discuss all your concerns properly.
                </p>
              </div>
            </div>

            <div className={styles.stat}>
              <div className={styles.statNumber}>24</div>
              <div className={styles.statContent}>
                <div className={styles.statLabel}>HOUR AVAILABILITY</div>
                <p className={styles.statDescription}>
                  Doctors available evenings, weekends, and holidays. Healthcare on your schedule.
                </p>
              </div>
            </div>
          </div>

          <button
            className={styles.ctaButton}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={onBookingClick}
          >
            Book a Consultation now
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.arrow}
              style={{
                transform: isHovering ? 'translateX(4px)' : 'translateX(0)',
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

        {/* Image Column */}
        <div className={styles.imageColumn}>
          <Image
            src="/images/gp/2.jpeg"
            alt="Private GP consultation and healthcare services"
            width={600}
            height={500}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
