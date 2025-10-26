'use client';

import { useState } from 'react';
import styles from './PrivateGPFAQSection.module.css';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How quickly can I see a doctor?',
    answer: 'Most appointments are available the same day, with consultations often available within 15 minutes. We offer 24/7 availability including evenings, weekends, and holidays. Book online or call us for immediate assistance.',
  },
  {
    question: 'Can you prescribe medication?',
    answer: 'Yes, our GMC-registered doctors can prescribe medication when clinically appropriate. Prescriptions are sent electronically to your chosen pharmacy or can be collected from our clinic. We can also arrange delivery for your convenience.',
  },
  {
    question: 'Do you provide sick notes?',
    answer: 'Absolutely. Our doctors can provide fit notes (sick notes) for work or school when medically necessary. These are provided immediately during your consultation and can be emailed or posted to you.',
  },
  {
    question: 'Can you refer me to specialists?',
    answer: 'Yes, we can refer you to specialists across all medical disciplines. We have established relationships with leading consultants and can arrange priority appointments, often within days. All referrals include comprehensive medical notes.',
  },
  {
    question: 'Is this covered by insurance?',
    answer: 'Many private health insurance policies cover GP consultations. We provide detailed invoices and medical reports for insurance claims. Check with your provider about coverage. We accept all major insurers and can bill them directly.',
  },
];

export default function PrivateGPFAQSection() {
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
