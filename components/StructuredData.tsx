export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "The Wellness London",
    "description": "Private blood testing and advanced biomarker analysis clinic in London",
    "url": "https://bloodtests.thewellnesslondon.com",
    "logo": "https://thewellnesslondon.com/logo.png",
    "image": "https://bloodtests.thewellnesslondon.com/images/bloods/1.jpg",
    "telephone": "+44-20-1234-5678",
    "priceRange": "££-£££",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5074,
      "longitude": -0.1278
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://thewellnesslondon.com"
    ]
  };

  const lifestylePanelSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "name": "Lifestyle Blood Panel",
    "description": "Comprehensive analysis of core health markers including blood count, organ function, and vitamins. 37 biomarkers tested.",
    "provider": {
      "@type": "MedicalBusiness",
      "name": "The Wellness London"
    },
    "offers": {
      "@type": "Offer",
      "price": "400",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "url": "https://bloodtests.thewellnesslondon.com"
    },
    "usedToDiagnose": {
      "@type": "MedicalCondition",
      "name": "General Health Assessment"
    }
  };

  const hormonePanelSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "name": "Hormone Blood Panel",
    "description": "Everything in Lifestyle Panel plus comprehensive hormonal health testing and fertility markers. 52 biomarkers tested.",
    "provider": {
      "@type": "MedicalBusiness",
      "name": "The Wellness London"
    },
    "offers": {
      "@type": "Offer",
      "price": "500",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "url": "https://bloodtests.thewellnesslondon.com"
    },
    "usedToDiagnose": {
      "@type": "MedicalCondition",
      "name": "Hormonal Health Assessment"
    }
  };

  const executivePanelSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "name": "Executive Blood Panel",
    "description": "Our most comprehensive panel including cancer screening, autoimmune markers, and longevity biomarkers. 60+ biomarkers tested.",
    "provider": {
      "@type": "MedicalBusiness",
      "name": "The Wellness London"
    },
    "offers": {
      "@type": "Offer",
      "price": "650",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "url": "https://bloodtests.thewellnesslondon.com"
    },
    "usedToDiagnose": {
      "@type": "MedicalCondition",
      "name": "Comprehensive Health Screening"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How quickly will I receive my results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most results are available within 4-24 hours via our secure online portal. Complex tests may take up to 48 hours. You'll receive an email notification when your results are ready, along with a comprehensive report and doctor's analysis."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to fast before my test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For most blood tests, we recommend fasting for 8-12 hours before your appointment. You can drink water during this time. However, fasting requirements vary by test type. When you book, we'll provide specific preparation instructions for your chosen panel."
        }
      },
      {
        "@type": "Question",
        "name": "Is a doctor's referral needed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No referral is needed. Our private blood testing service is available to anyone who wants to proactively monitor their health. However, we do recommend discussing results with your GP or our doctors, especially if any abnormalities are detected."
        }
      },
      {
        "@type": "Question",
        "name": "Can I claim on private health insurance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many private health insurance policies cover diagnostic blood tests. We can provide itemised receipts and medical reports for insurance claims. Please check with your provider about coverage and claim procedures before booking."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in the price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The price includes: blood sample collection by our certified phlebotomist, all laboratory testing, secure online results portal access, comprehensive report with reference ranges, and doctor's analysis with health recommendations. No hidden fees."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://thewellnesslondon.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://thewellnesslondon.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Blood Tests",
        "item": "https://bloodtests.thewellnesslondon.com"
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Book a Private Blood Test",
    "description": "Simple process to book your private blood test appointment",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Book Online",
        "text": "Choose your test and book a convenient appointment slot. Same-day availability.",
        "url": "https://bloodtests.thewellnesslondon.com"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Visit Our Clinic",
        "text": "Quick 10-minute visit. Our phlebotomists make the process comfortable and efficient."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Get Results",
        "text": "Receive your results via secure portal within 4-24 hours, depending on test."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Doctor Review",
        "text": "Comprehensive report with doctor's analysis and health recommendations."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lifestylePanelSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hormonePanelSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(executivePanelSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
