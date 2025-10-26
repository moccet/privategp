'use client';

import styles from './BloodTestPackagesOverview.module.css';

export default function BloodTestPackagesOverview() {
  return (
    <section className={styles.section} id="panels">
      <div className={styles.container}>
        <h2 className={styles.heading}>Blood Test Packages</h2>

        <p className={styles.tagline}>
          <em>Decode</em> Your Biomarkers, Define <em>Your</em> Wellness
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>4hrs</div>
            <div className={styles.statLabel}>AVERAGE RESULTS</div>
          </div>

          <div className={styles.stat}>
            <div className={styles.statValue}>500+</div>
            <div className={styles.statLabel}>BIOMARKERS</div>
          </div>

          <div className={styles.stat}>
            <div className={styles.statValue}>£400</div>
            <div className={styles.statLabel}>STARTING FROM</div>
          </div>

          <div className={styles.stat}>
            <div className={styles.statValue}>10k+</div>
            <div className={styles.statLabel}>TESTS COMPLETED</div>
          </div>
        </div>

        <div className={styles.rating}>
          <div className={styles.stars}>★★★★★</div>
          <span className={styles.ratingText}>5 out of 5</span>
        </div>

        <p className={styles.description}>
          Advanced biomarker analysis to measure essential health indicators, identify risk factors,
          and create personalised strategies for peak vitality.
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
