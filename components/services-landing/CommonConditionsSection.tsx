'use client';

import styles from './CommonConditionsSection.module.css';

const conditions = [
  'Respiratory Infections',
  'Skin Conditions',
  'Mental Health',
  "Men's Health",
  'Sexual Health',
  "Women's Health",
  'Digestive Issues',
  'Chronic Conditions',
  'Travel Medicine',
  'Joint & Back Pain',
];

export default function CommonConditionsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Common Conditions We Treat</h2>

        <p className={styles.subheading}>EXPERT CARE FOR ALL HEALTH CONCERNS</p>

        <div className={styles.grid}>
          {conditions.map((condition, index) => (
            <div key={index} className={styles.card}>
              {condition}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
