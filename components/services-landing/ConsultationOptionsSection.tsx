'use client';

import styles from './ConsultationOptionsSection.module.css';

export default function ConsultationOptionsSection() {
  return (
    <section className={styles.section} id="options">
      <div className={styles.container}>
        <h2 className={styles.heading}>Consultation Options</h2>

        <p className={styles.subheading}>
          Your doctor is available <em className={styles.nowText}>now</em>. And at 3am. And Sunday morning.
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>15 min</div>
            <div className={styles.statLabel}>AVERAGE WAIT</div>
          </div>

          <div className={styles.stat}>
            <div className={styles.statValue}>30 min</div>
            <div className={styles.statLabel}>WITH DOCTOR</div>
          </div>

          <div className={styles.stat}>
            <div className={styles.statValue}>24h</div>
            <div className={styles.statLabel}>AVAILABILITY</div>
          </div>

          <div className={styles.stat}>
            <div className={styles.statValue}>95%+</div>
            <div className={styles.statLabel}>SATISFACTION</div>
          </div>
        </div>

        <p className={styles.description}>
          Skip NHS queues. Expert private GPs available 24/7. Same-day appointments, prescriptions, and specialist referrals.
        </p>

        <div className={styles.availability}>
          <h3 className={styles.availabilityTitle}>Same-Day Results Available</h3>
          <p className={styles.availabilityText}>
            Most results within 24-48 hours. Secure online access with detailed explanations.
          </p>
        </div>
      </div>
    </section>
  );
}
