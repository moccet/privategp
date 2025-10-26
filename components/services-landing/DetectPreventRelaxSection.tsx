'use client';

import Image from 'next/image';
import styles from './DetectPreventRelaxSection.module.css';

export default function DetectPreventRelaxSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Content Column */}
        <div className={styles.content}>
          <h2 className={styles.heading}>
            Detect. Prevent. <em className={styles.relaxText}>Relax.</em>
          </h2>

          <p className={styles.description}>
            Your health is dynamic. We screen for cardiovascular risk factors, metabolic dysfunction,
            and early disease markers. Private AI models analyse your data to identify patterns and
            priorities, ensuring nothing is missed.
          </p>
        </div>

        {/* Image Column */}
        <div className={styles.imageColumn}>
          <Image
            src="/images/bloods/6.jpg"
            alt="Advanced blood analysis and health screening technology"
            width={600}
            height={500}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
