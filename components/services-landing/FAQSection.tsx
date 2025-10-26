'use client';

import { useState } from 'react';
import styles from './FAQSection.module.css';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How quickly will I receive my results?',
    answer: 'Most results are available within 4-24 hours via our secure online portal. Complex tests may take up to 48 hours. You\'ll receive an email notification when your results are ready, along with a comprehensive report and doctor\'s analysis.',
  },
  {
    question: 'Do I need to fast before my test?',
    answer: 'For most blood tests, we recommend fasting for 8-12 hours before your appointment. You can drink water during this time. However, fasting requirements vary by test type. When you book, we\'ll provide specific preparation instructions for your chosen panel.',
  },
  {
    question: 'Is a doctor\'s referral needed?',
    answer: 'No referral is needed. Our private blood testing service is available to anyone who wants to proactively monitor their health. However, we do recommend discussing results with your GP or our doctors, especially if any abnormalities are detected.',
  },
  {
    question: 'Can I claim on private health insurance?',
    answer: 'Many private health insurance policies cover diagnostic blood tests. We can provide itemised receipts and medical reports for insurance claims. Please check with your provider about coverage and claim procedures before booking.',
  },
  {
    question: 'What\'s included in the price?',
    answer: 'The price includes: blood sample collection by our certified phlebotomist, all laboratory testing, secure online results portal access, comprehensive report with reference ranges, and doctor\'s analysis with health recommendations. No hidden fees.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Frequently Asked Questions</h2>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <svg
                  className={`${styles.arrow} ${openIndex === index ? styles.arrowOpen : ''}`}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className={`${styles.faqAnswer} ${openIndex === index ? styles.answerOpen : ''}`}
              >
                <p className={styles.answerText}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
