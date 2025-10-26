'use client';

import { useState } from 'react';
import styles from './ConsultationCardsSection.module.css';

interface ConsultationCard {
  title: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
  availability: string;
  consultationCode: string;
}

interface ConsultationCardsSectionProps {
  onBookingClick?: (consultationCode: string) => void;
}

const consultationCards: ConsultationCard[] = [
  {
    title: 'Telephone Consultation',
    description: 'Convenient phone consultation with medical advice and guidance.',
    features: [
      'Convenient phone consultation',
      'Medical advice and guidance',
      'Prescriptions if appropriate',
      'Sick notes available',
      'Follow-up recommendations',
    ],
    price: '£ 49',
    duration: '15 minutes',
    availability: 'Same day availability',
    consultationCode: 'virtual-consultation',
  },
  {
    title: 'Classic Appointment',
    description: 'Comprehensive examination with diagnosis and treatment plan.',
    features: [
      'Comprehensive examination',
      'Diagnosis and treatment plan',
      'Prescriptions if needed',
      'Sick notes available',
      'Specialist referrals',
    ],
    price: '£ 150',
    duration: '30 minutes',
    availability: 'Next day availability',
    consultationCode: 'private-gp-consultation',
  },
  {
    title: 'Same Day Urgent',
    description: 'Classic Appointment plus priority booking for urgent needs.',
    features: [
      'Same day appointment',
      'Priority booking',
      'Urgent health concerns',
      'Immediate treatment',
      'Fast-track referrals',
      'Emergency prescriptions',
    ],
    price: '£ 220',
    duration: '30 minutes',
    availability: 'Same day availability',
    consultationCode: 'express-consultations',
  },
];

export default function ConsultationCardsSection({ onBookingClick }: ConsultationCardsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.scrollContainer}>
        {consultationCards.map((card, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardHeader}></div>

            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{card.title}</h3>

              <p className={styles.cardDescription}>{card.description}</p>

              <ul className={styles.featuresList}>
                {card.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className={styles.feature}>
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
                    {feature}
                  </li>
                ))}
              </ul>

              <div className={styles.divider}></div>

              <div className={styles.pricing}>
                <div className={styles.price}>{card.price}</div>
                <div className={styles.details}>
                  {card.duration} • {card.availability}
                </div>
              </div>

              <button
                className={styles.bookButton}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onBookingClick?.(card.consultationCode)}
              >
                Book Now
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.arrow}
                  style={{
                    transform: hoveredIndex === index ? 'translateX(4px)' : 'translateX(0)',
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
        ))}
      </div>
    </section>
  );
}
