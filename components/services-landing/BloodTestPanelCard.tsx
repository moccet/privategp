'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './BloodTestPanelCard.module.css';

interface BloodTestPanelCardProps {
  title: string;
  price: string;
  markers: string;
  duration: string;
  includedItems: string[];
  imagePath: string;
  imageAlt: string;
  ctaText: string;
  ctaHref?: string;
  onBookingClick?: () => void;
  reverse?: boolean;
  buttonColor?: string;
}

export default function BloodTestPanelCard({
  title,
  price,
  markers,
  duration,
  includedItems,
  imagePath,
  imageAlt,
  ctaText,
  ctaHref,
  onBookingClick,
  reverse = false,
  buttonColor = '#6B9B7B',
}: BloodTestPanelCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleCtaClick = () => {
    if (onBookingClick) {
      onBookingClick();
    } else if (ctaHref) {
      window.open(ctaHref, '_blank');
    }
  };

  // Calculate a slightly darker color for hover state
  const darkenColor = (color: string, percent: number = 10): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return '#' + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${reverse ? styles.reverse : ''}`}>
        {/* Image Column */}
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src={imagePath}
              alt={imageAlt}
              width={600}
              height={700}
              className={styles.image}
            />
          </div>
        </div>

        {/* Content Column */}
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>

          <div className={styles.price}>{price}</div>

          <div className={styles.details}>
            {markers} • {duration}
          </div>

          <div className={styles.includedSection}>
            <h3 className={styles.includedHeading}>WHAT'S INCLUDED</h3>

            <ul className={styles.includedList}>
              {includedItems.map((item, index) => (
                <li key={index} className={styles.includedItem}>
                  <svg
                    className={styles.checkmark}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3334 4L6.00002 11.3333L2.66669 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            className={styles.ctaButton}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleCtaClick}
            style={{
              backgroundColor: isHovering ? darkenColor(buttonColor) : buttonColor,
            }}
          >
            {ctaText}
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
      </div>
    </section>
  );
}
