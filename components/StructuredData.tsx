export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "The Wellness London - Private GP",
    "description": "Private GP consultations in London with GMC registered doctors. Same-day appointments available for in-person, video, and telephone consultations.",
    "url": "https://bloodtests.thewellnesslondon.com",
    "logo": "https://thewellnesslondon.com/logo.png",
    "image": "https://bloodtests.thewellnesslondon.com/images/gp/1.jpeg",
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
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "sameAs": [
      "https://thewellnesslondon.com"
    ],
    "medicalSpecialty": "General Practice"
  };

  const videoConsultationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Video GP Consultation",
    "description": "Private video consultation with a GMC registered doctor. Available within 15 minutes for urgent cases or book in advance.",
    "provider": {
      "@type": "Physician",
      "name": "The Wellness London"
    },
    "offers": {
      "@type": "Offer",
      "price": "75",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "url": "https://bloodtests.thewellnesslondon.com"
    }
  };

  const inPersonConsultationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "In-Person GP Consultation",
    "description": "Face-to-face consultation with a private GP at our London clinic. Same-day appointments available with GMC registered doctors.",
    "provider": {
      "@type": "Physician",
      "name": "The Wellness London"
    },
    "offers": {
      "@type": "Offer",
      "price": "150",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "url": "https://bloodtests.thewellnesslondon.com"
    }
  };

  const homeVisitSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Home Visit GP Consultation",
    "description": "Private GP home visit service in London. GMC registered doctor visits you at home for comprehensive medical consultation.",
    "provider": {
      "@type": "Physician",
      "name": "The Wellness London"
    },
    "offers": {
      "@type": "Offer",
      "price": "250",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "url": "https://bloodtests.thewellnesslondon.com"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How quickly can I see a private GP?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most appointments are available within 15 minutes for video consultations and same-day for in-person visits. Our GMC registered doctors are available 24/7 to provide you with the medical care you need, when you need it."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need an NHS referral?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No NHS referral is required. Our private GP service is open to anyone seeking medical consultation. You can book directly online or by phone, and see a GMC registered doctor at your convenience."
        }
      },
      {
        "@type": "Question",
        "name": "Can the GP prescribe medication?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our GMC registered doctors can prescribe medication when clinically appropriate. Prescriptions are issued electronically and can be sent to your chosen pharmacy. Same-day prescriptions are available for urgent cases."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get a specialist referral?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our GPs can provide referrals to specialist consultants when medically necessary. We have priority access to leading specialists across London and can arrange appointments quickly, often within days rather than months."
        }
      },
      {
        "@type": "Question",
        "name": "Is private GP consultation covered by insurance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many private health insurance policies cover GP consultations. We can provide detailed invoices and medical reports for your insurance claims. Please check your specific policy coverage before booking, or contact us for assistance."
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
        "name": "Private GP",
        "item": "https://bloodtests.thewellnesslondon.com"
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Book a Private GP Consultation",
    "description": "Simple process to book your private GP appointment with a GMC registered doctor",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Choose Your Consultation Type",
        "text": "Select from video, in-person, or home visit consultation based on your needs.",
        "url": "https://bloodtests.thewellnesslondon.com"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Book Your Appointment",
        "text": "Choose a convenient time slot. Same-day appointments available, or book in advance."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "See Your Doctor",
        "text": "Meet with a GMC registered doctor for comprehensive medical consultation. Typically 30 minutes."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Get Your Prescription or Referral",
        "text": "Receive prescriptions electronically or specialist referral letters immediately after your consultation."
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoConsultationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(inPersonConsultationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeVisitSchema) }}
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
