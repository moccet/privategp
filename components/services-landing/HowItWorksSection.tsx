'use client';

import Image from 'next/image';
import styles from './HowItWorksSection.module.css';

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '1',
    title: 'Book Online',
    description: 'Choose your test and book a convenient appointment slot. Same-day availability.',
  },
  {
    number: '2',
    title: 'Visit Our Clinic',
    description: 'Quick 10-minute visit. Our phlebotomists make the process comfortable and efficient.',
  },
  {
    number: '3',
    title: 'Get Results',
    description: 'Receive your results via secure portal within 4-24 hours, depending on test.',
  },
  {
    number: '4',
    title: 'Doctor Review',
    description: "Comprehensive report with doctor's analysis and health recommendations.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>How it Works.</h2>

        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.imageContainer}>
          <Image
            src="/images/bloods/5.jpg"
            alt="Blood testing laboratory with phlebotomist and equipment"
            width={1200}
            height={600}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
