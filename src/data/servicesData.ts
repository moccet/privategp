import { ServiceData } from '@/types/services'

export const servicesData: Record<string, ServiceData> = {
  'free-consultation': {
    title: 'Free Consultation',
    subtitle: 'Book your complimentary wellness consultation',
    options: [
      {
        code: 'consultation',
        name: 'Wellness Consultation',
        price: 'FREE',
        originalPrice: '£90',
        desc: 'Comprehensive consultation with our wellness expert to discuss your health goals and create a personalised treatment plan.',
        duration: '30 MINS',
        tag: 'LIMITED OFFER'
      }
    ]
  },
  'diagnostics-screening': {
    title: 'Diagnostics & Screening',
    subtitle: 'Comprehensive health testing',
    options: [
      // Blood Test Panels
      {
        code: 'lifestyle-panel',
        name: 'Lifestyle Blood Panel',
        price: '£400',
        desc: 'Core health markers including cholesterol, liver, kidney, vitamins, and inflammation.',
        duration: '30 MINS',
        tag: '37 MARKERS'
      },
      {
        code: 'lifestyle-hormone',
        name: 'Hormone Blood Panel',
        price: '£500',
        desc: 'Everything in Lifestyle plus thyroid, testosterone, oestrogen, and cortisol testing.',
        duration: '30 MINS',
        tag: '52 MARKERS'
      },
      {
        code: 'advanced-panel',
        name: 'Executive Blood Panel',
        price: '£650',
        desc: '60+ biomarkers including genetic risk factors and supplement recommendations.',
        duration: '45 MINS',
        tag: '60+ MARKERS'
      },
      // Medical Imaging
      {
        code: 'mri-scan',
        name: 'MRI Scan',
        price: '£495',
        desc: 'High-resolution 3T MRI for detailed imaging of soft tissues, brain, spine, joints, and organs. Includes GP referral letter and consultant radiologist report.',
        duration: '45-60 MINS',
        tag: '3T SCANNER'
      },
      {
        code: 'ct-scan',
        name: 'CT Scan',
        price: '£550',
        desc: 'Ultra-fast 128-slice CT for comprehensive body imaging, cardiac, and vascular studies. Low-dose protocols with 3D reconstruction available.',
        duration: '15-30 MINS',
        tag: '128-SLICE'
      },
      {
        code: 'ultrasound',
        name: 'Ultrasound',
        price: '£245',
        desc: 'Dynamic real-time imaging for pregnancy, abdomen, pelvis, and vascular studies. 4D pregnancy scans and Doppler studies available.',
        duration: '20-40 MINS',
        tag: '4D AVAILABLE'
      },
      {
        code: 'xray',
        name: 'X-Ray',
        price: '£95',
        desc: 'Digital radiography for bones, chest, and spine with immediate image availability. Minimal radiation dose with instant results.',
        duration: '10 MINS',
        tag: 'INSTANT RESULTS'
      },
      // Gut Microbiome Testing
      {
        code: 'gut-comprehensive',
        name: 'Comprehensive Gut Analysis',
        price: '£395',
        desc: 'Complete microbiome sequencing with bacterial diversity analysis, inflammation markers, digestive function, and personalised nutrition protocol.',
        duration: '45 MINS',
        tag: 'FULL ANALYSIS'
      },
      {
        code: 'gut-sibo',
        name: 'SIBO & Breath Testing',
        price: '£275',
        desc: 'Small intestinal bacterial overgrowth testing with hydrogen and methane breath analysis, plus targeted treatment recommendations.',
        duration: '2 HOURS',
        tag: 'SIBO TEST'
      },
      {
        code: 'gut-food',
        name: 'Food Sensitivity Panel',
        price: '£295',
        desc: 'Comprehensive food intolerance and sensitivity testing for 200+ foods with elimination diet plan and reintroduction protocol.',
        duration: '30 MINS',
        tag: 'FOOD TESTING'
      },
      {
        code: 'gut-programme',
        name: '12-Week Gut Reset',
        price: '£1200',
        desc: 'Complete gut restoration programme with initial testing, personalised supplements, nutrition plan, and two follow-up assessments.',
        duration: '12 WEEKS',
        tag: 'TRANSFORMATION'
      }
    ]
  },
  'aesthetic-regenerative': {
    title: 'Aesthetic & Regenerative Medicine',
    subtitle: 'Transform your appearance naturally',
    options: [
      // PRP Treatments
      {
        code: 'joint-prp',
        name: 'Joint PRP Therapy',
        price: '£650',
        desc: 'PRP injections for joint pain plus collagen supplements for ongoing support.',
        duration: '60 MINS',
        tag: 'KNEE • HIP • SHOULDER'
      },
      {
        code: 'hair-prp',
        name: 'Hair PRP',
        price: '£395',
        desc: 'PRP injections to improve hair density and reduce thinning.',
        duration: '45 MINS',
        tag: 'HAIR LOSS'
      },
      {
        code: 'hair-complete',
        name: 'Hair Complete',
        price: '£545',
        desc: 'PRP therapy plus prescription medications and targeted supplements.',
        duration: '60 MINS',
        tag: 'PRP + MEDS'
      },
      {
        code: 'facial-prp',
        name: 'Vampire Facial',
        price: '£415',
        desc: 'PRP facial treatment to improve texture, tone, and natural glow.',
        duration: '75 MINS',
        tag: 'COLLAGEN BOOST'
      },
      // Medical Facials
      {
        code: 'anti-wrinkle',
        name: 'Anti-Wrinkle Injections',
        price: '£295',
        desc: 'Precision muscle relaxation to soften expression lines including frown lines, forehead lines, and crow\'s feet. Results typically visible within 3-7 days.',
        duration: '30 MINS',
        tag: 'BOTULINUM TOXIN'
      },
      {
        code: 'polynucleotide',
        name: 'Polynucleotide Therapy',
        price: '£550',
        desc: 'Salmon DNA-derived polynucleotides to stimulate cellular renewal and improve skin quality. Promotes collagen production and tissue repair over time.',
        duration: '45 MINS',
        tag: 'REGENERATIVE'
      },
      {
        code: 'skin-boosters',
        name: 'Skin Boosters',
        price: '£495',
        desc: 'Injectable hyaluronic acid treatment that improves skin hydration, elasticity, and texture from within. Suitable for facial skin quality improvement and hand rejuvenation.',
        duration: '45 MINS',
        tag: 'BIO REMODELING'
      },
      {
        code: 'dermal-fillers',
        name: 'Dermal Fillers',
        price: '£525',
        desc: 'Hyaluronic acid fillers to restore volume, enhance contours, and reduce the appearance of lines. Results immediate, typically lasting 6-18 months depending on area treated.',
        duration: '60 MINS',
        tag: 'STRUCTURAL'
      },
      {
        code: 'pdo-thread-lift',
        name: 'PDO Thread Lift',
        price: '£850',
        desc: 'Dissolvable polydioxanone threads to provide lift and stimulate collagen production. Results immediate with continued improvement over 3-6 months as collagen forms.',
        duration: '90 MINS',
        tag: 'NON-SURGICAL'
      },
      {
        code: 'chemical-peels',
        name: 'Chemical Peels',
        price: '£375',
        desc: 'Professional chemical peels using medical-grade acids to improve skin texture, reduce pigmentation, and promote cellular turnover. Strength tailored to skin type and concerns.',
        duration: '60 MINS',
        tag: 'MEDICAL GRADE'
      },
      {
        code: 'korean-glass',
        name: 'Korean Glass Skin',
        price: '£195',
        desc: '7-step K-beauty facial for translucent, dewy skin with deep hydration.',
        duration: '90 MINS',
        tag: '7 STEPS'
      },
      {
        code: 'cellular-renewal',
        name: 'Cellular Renewal Pro',
        price: '£275',
        desc: 'Microneedling with growth factors and LED therapy to reduce fine lines.',
        duration: '120 MINS',
        tag: 'MICRONEEDLING'
      },
      {
        code: 'nasa-led',
        name: 'NASA LED Therapy',
        price: '£225',
        desc: 'Red light therapy originally developed by NASA. Stimulates collagen and healing.',
        duration: '60 MINS',
        tag: 'RED LIGHT'
      },
      // Facial Packages
      {
        code: 'facial-essential',
        name: 'The Essential Package',
        price: '£695',
        originalPrice: '£895',
        desc: 'Anti-Wrinkle treatment (2 areas), Vitamin Skin Booster, medical consultation, 2-week review included, and aftercare product guidance.',
        duration: '2-3 HOURS',
        tag: 'SAVE £200'
      },
      {
        code: 'facial-signature',
        name: 'The Signature Package',
        price: '£1,495',
        originalPrice: '£1,950',
        desc: 'Anti-Wrinkle treatment (3 areas), Profhilo bio-remodeling, Vitamin Skin Booster, facial architecture assessment, 2 follow-up appointments, and complete aftercare kit.',
        duration: '3-4 HOURS',
        tag: 'SAVE £455'
      },
      {
        code: 'facial-prestige',
        name: 'The Prestige Package',
        price: '£2,995',
        originalPrice: '£3,845',
        desc: 'Comprehensive facial assessment, Anti-Wrinkle treatment (3 areas), Dermal Fillers (3 mL), Polynucleotide therapy, and 6-month treatment plan.',
        duration: '6 MONTHS',
        tag: 'SAVE £850'
      },
      // IV Therapy
      {
        code: 'deluxe-recovery',
        name: 'Deluxe Recovery IV',
        price: '£350',
        desc: 'Our strongest IV therapy with high-dose vitamins, minerals, and antioxidants.',
        duration: '60 MINS',
        tag: 'FULL SPECTRUM'
      },
      {
        code: 'immunity-boost',
        name: 'Immunity Boost IV',
        price: '£250',
        desc: 'High-dose Vitamin C, Zinc, and B-vitamins to support immune function.',
        duration: '45 MINS',
        tag: 'HIGH DOSE C'
      },
      {
        code: 'energy-performance',
        name: 'Energy & Performance',
        price: '£300',
        desc: 'B-vitamins, amino acids, and CoQ10 for sustained energy and mental clarity.',
        duration: '45 MINS',
        tag: 'B-COMPLEX'
      },
      {
        code: 'hydration',
        name: 'Recovery & Hydration',
        price: '£200',
        desc: 'Fast rehydration with electrolytes and minerals. Perfect after exercise or illness.',
        duration: '30 MINS',
        tag: 'HANGOVER FIX'
      },
      {
        code: 'nad-plus',
        name: 'NAD+ Therapy',
        price: '£450',
        desc: 'NAD+ infusion for cellular health, brain function, and healthy ageing.',
        duration: '90 MINS',
        tag: 'LONGEVITY'
      },
      {
        code: 'beauty-glow',
        name: 'Beauty Glow IV',
        price: '£320',
        desc: 'Glutathione, biotin, and vitamin C for radiant skin, hair, and nails.',
        duration: '45 MINS',
        tag: 'SKIN & HAIR'
      }
    ]
  },
  'primary-care': {
    title: 'Primary Care',
    subtitle: 'Comprehensive medical services',
    options: [
      // Private GP Services
      {
        code: 'gp-telephone',
        name: 'Telephone Consultation',
        price: '£49',
        desc: 'Convenient phone consultation for non-urgent medical advice and prescriptions.',
        duration: '15 MINS',
        tag: 'TELEPHONE'
      },
      {
        code: 'gp-classic',
        name: 'Classic GP Appointment',
        price: '£150',
        desc: 'Full consultation with examination, diagnosis, and treatment plan.',
        duration: '30 MINS',
        tag: 'NEXT DAY'
      },
      {
        code: 'gp-same-day',
        name: 'Same Day Urgent GP',
        price: '£220',
        desc: 'See a doctor today for urgent medical concerns. Appointments available within hours.',
        duration: '30 MINS',
        tag: 'TODAY'
      },
      {
        code: 'medical-report',
        name: 'Medical Report',
        price: '£250',
        desc: 'Official medical documentation for insurance, legal, or travel needs.',
        duration: '48 HOURS',
        tag: 'FAST TURNAROUND'
      },
      // Prescription Services
      {
        code: 'prescription-auto-refill',
        name: 'Repeat Prescription Refills',
        price: '£35',
        desc: 'Auto-refill service with 3-6 month supplies. SMS reminders ensure you never miss a dose.',
        duration: 'AUTO-REFILL',
        tag: 'REFILL FEE'
      },
      {
        code: 'prescription-new',
        name: 'New Prescription Consultation',
        price: '£85',
        desc: '15-minute GMC-doctor video or phone consultation. All UK medications available with same-day prescription issue.',
        duration: '15 MINS',
        tag: 'CONSULTATION'
      },
      {
        code: 'prescription-urgent',
        name: 'Emergency Prescription',
        price: '£110',
        desc: '2-hour turnaround for urgent needs. Weekend & holiday coverage, lost medication replacement.',
        duration: '2 HOURS',
        tag: 'URGENT'
      },
      // Medical Certificates
      {
        code: 'visa-medical-basic',
        name: 'Visa Medical Certificate',
        price: '£70',
        desc: 'Same-day medical certificate of good health for visa applications. Accepted worldwide.',
        duration: 'SAME DAY',
        tag: 'VISA'
      },
      {
        code: 'pregnancy-fit-to-fly',
        name: 'Pregnancy Fit-to-Fly',
        price: '£50',
        desc: 'Medical certificate confirming both mother and baby are safe to travel. Required by airlines.',
        duration: 'SAME DAY',
        tag: 'PREGNANCY'
      },
      {
        code: 'travel-cancellation',
        name: 'Travel Cancellation Certificate',
        price: '£50',
        desc: 'Medical certificate confirming illness preventing travel. Required for insurance claims.',
        duration: 'SAME DAY',
        tag: 'CANCELLATION'
      },
      // Driver Medicals
      {
        code: 'hgv-d4',
        name: 'HGV D4 Medical',
        price: '£95',
        desc: 'Complete DVLA D4 medical examination for HGV/LGV drivers. Required for Category C and C+E licenses.',
        duration: '30 MINS',
        tag: 'GROUP 2'
      },
      {
        code: 'taxi-medical',
        name: 'Taxi Medical',
        price: '£105',
        desc: 'Medical assessment for taxi and private hire drivers. Accepted by TfL and all UK local authorities.',
        duration: '30 MINS',
        tag: 'TFL APPROVED'
      },
      {
        code: 'pcv-bus',
        name: 'PCV Bus Medical',
        price: '£95',
        desc: 'DVLA D4 medical for bus and coach drivers. Required for Category D and D+E licenses.',
        duration: '30 MINS',
        tag: 'BUS DRIVER'
      }
    ]
  },
  'wellness-performance': {
    title: 'Wellness & Performance',
    subtitle: 'Optimize your vitality and performance',
    options: [
      // Executive Health Programmes
      {
        code: 'pulse-assessment',
        name: 'Pulse',
        price: '£499',
        desc: 'Essential baseline with biomarkers that matter and same-day action plan. Includes core blood biomarkers (apoB, HbA1c, hs-CRP), body composition (BIA), 14-day continuous glucose monitoring, and 10-15 targeted actions.',
        duration: '30 MINS',
        tag: 'ONE-TIME'
      },
      {
        code: 'continuum-programme',
        name: 'Continuum',
        price: '£699',
        desc: 'Year-long programme with quarterly monitoring and medication when needed. Includes Pulse quarterly, clinician reviews, DEXA scans, and Oura ring included.',
        duration: 'MONTHLY',
        tag: 'SUBSCRIPTION'
      },
      {
        code: 'superhuman-assessment',
        name: 'Superhuman+',
        price: '£12,500',
        desc: 'Comprehensive diagnostics in one day with same-day physician conference. Includes whole-body MRI, cardiac imaging (CT calcium), VO2-max testing (CPET), deep blood biomarker panel, 7-day continuous glucose monitoring, 1-day ABPM, 60-90 minute clinician consultation, and Oura ring included.',
        duration: 'FULL DAY',
        tag: 'PREMIUM'
      },
      // Weight Management Programmes
      {
        code: 'basic-weight',
        name: 'Foundation',
        price: '£250/month',
        desc: 'Comprehensive medical weight management including prescription medication (if clinically appropriate), monthly doctor consultations, and nutritional support.',
        duration: '6 MONTHS',
        tag: 'FOUNDATION'
      },
      {
        code: 'complete-weight',
        name: 'Complete',
        price: '£450/month',
        desc: 'Our most comprehensive programme with enhanced support, regular monitoring, and extended medication coverage for sustained results and long-term success.',
        duration: '12 MONTHS',
        tag: 'COMPREHENSIVE'
      },
      {
        code: 'glp1-weight',
        name: 'Elite',
        price: '£850/month',
        desc: 'Premium all-inclusive programme with dedicated doctor, weekly support, comprehensive testing, and personalized optimization for maximum results and accountability.',
        duration: '12 MONTHS',
        tag: 'CONCIERGE'
      },
      // Wedding Programmes
      {
        code: 'wedding-essential-3-month',
        name: 'Essential Wedding Programme',
        price: '£5,500',
        desc: 'Core transformation package including hormone optimisation, body composition analysis, 12 PT sessions, nutrition protocol, and 3 focus areas of your choice.',
        duration: '3 MONTHS',
        tag: 'WORTH £7,200'
      },
      {
        code: 'wedding-signature-3-month',
        name: 'Signature Wedding Programme',
        price: '£9,500',
        desc: 'Complete transformation with monthly hormone optimisation, genetic testing, 24 PT sessions, medical weight management, weekly IV therapy, and 5 treatment series of your choice.',
        duration: '3 MONTHS',
        tag: 'WORTH £13,500'
      },
      {
        code: 'wedding-platinum-3-month',
        name: 'Platinum Wedding Programme',
        price: '£18,500',
        desc: 'Ultimate luxury package with unlimited PT, weekly consultations, stem cell therapy, maximum treatment access, and £3,000 aesthetics credit. Includes couples spa treatments.',
        duration: '3 MONTHS',
        tag: 'WORTH £28,000'
      }
    ]
  },
  'executive-pulse': {
    title: 'Pulse',
    subtitle: 'Essential baseline health assessment',
    options: [
      {
        code: 'pulse-assessment',
        name: 'Pulse',
        price: '£499',
        desc: 'Essential baseline with biomarkers that matter and same-day action plan. Includes core blood biomarkers (apoB, HbA1c, hs-CRP), body composition (BIA), 14-day continuous glucose monitoring, and 10-15 targeted actions.',
        duration: '30 MINS',
        tag: 'ONE-TIME'
      }
    ]
  },
  'executive-continuum': {
    title: 'Continuum',
    subtitle: 'Year-long health monitoring programme',
    options: [
      {
        code: 'continuum-programme',
        name: 'Continuum',
        price: '£699',
        desc: 'Year-long programme with quarterly monitoring and medication when needed. Includes Pulse quarterly, clinician reviews, DEXA scans, and Oura ring included.',
        duration: 'MONTHLY',
        tag: 'SUBSCRIPTION'
      }
    ]
  },
  'executive-superhuman': {
    title: 'Superhuman+',
    subtitle: 'Comprehensive one-day health diagnostics',
    options: [
      {
        code: 'superhuman-assessment',
        name: 'Superhuman+',
        price: '£12,500',
        desc: 'Comprehensive diagnostics in one day with same-day physician conference. Includes whole-body MRI, cardiac imaging (CT calcium), VO2-max testing (CPET), deep blood biomarker panel, 7-day continuous glucose monitoring, 1-day ABPM, 60-90 minute clinician consultation, and Oura ring included.',
        duration: 'FULL DAY',
        tag: 'PREMIUM'
      }
    ]
  },
  'wedding-essential-3': {
    title: 'Essential Wedding Programme',
    subtitle: '3 Month Transformation',
    options: [
      {
        code: 'wedding-essential-3-month',
        name: 'Essential 3-Month Package',
        price: '£5,500',
        desc: 'Core transformation package including hormone optimisation, body composition analysis, 12 PT sessions, nutrition protocol, and 3 focus areas of your choice.',
        duration: '3 MONTHS',
        tag: 'WORTH £7,200'
      }
    ]
  },
  'wedding-signature-3': {
    title: 'Signature Wedding Programme',
    subtitle: '3 Month Complete Transformation',
    options: [
      {
        code: 'wedding-signature-3-month',
        name: 'Signature 3-Month Package',
        price: '£9,500',
        desc: 'Complete transformation with monthly hormone optimisation, genetic testing, 24 PT sessions, medical weight management, weekly IV therapy, and 5 treatment series of your choice.',
        duration: '3 MONTHS',
        tag: 'WORTH £13,500'
      }
    ]
  },
  'wedding-platinum-3': {
    title: 'Platinum Wedding Programme',
    subtitle: '3 Month Luxury Experience',
    options: [
      {
        code: 'wedding-platinum-3-month',
        name: 'Platinum 3-Month Package',
        price: '£18,500',
        desc: 'Ultimate luxury package with unlimited PT, weekly consultations, stem cell therapy, maximum treatment access, and £3,000 aesthetics credit. Includes couples spa treatments.',
        duration: '3 MONTHS',
        tag: 'WORTH £28,000'
      }
    ]
  },
  'corporate-wellness': {
    title: 'Corporate Wellness Packages',
    subtitle: 'Transform your workplace wellness',
    options: [
      {
        code: 'executive-wellness',
        name: 'Executive Wellness Package',
        price: '£1,500',
        desc: 'Monthly health optimisation for leadership. Includes quarterly biomarkers, monthly IV therapy, nutrition plans, and medical team access.',
        duration: 'MONTHLY',
        tag: '1:1 GUIDANCE'
      },
      {
        code: 'wellness-day',
        name: 'On-Site Wellness Day',
        price: '£5,000',
        desc: 'Full day of on-site treatments including IV therapy, health screenings, and consultations for your team.',
        duration: 'FULL DAY',
        tag: 'WORKPLACE SOLUTION'
      },
      {
        code: 'employee-credits-100',
        name: 'Employee Credits - Starter',
        price: '£100',
        desc: 'Monthly wellness credits per employee. Perfect for small teams starting their wellness journey.',
        duration: 'PER EMPLOYEE/MONTH',
        tag: 'STARTER'
      },
      {
        code: 'employee-credits-250',
        name: 'Employee Credits - Professional',
        price: '£250',
        desc: 'Enhanced monthly credits with priority booking and expanded treatment options.',
        duration: 'PER EMPLOYEE/MONTH',
        tag: 'POPULAR CHOICE'
      },
      {
        code: 'employee-credits-500',
        name: 'Employee Credits - Executive',
        price: '£500',
        desc: 'Maximum wellness credits with VIP access, concierge service, and comprehensive health tracking.',
        duration: 'PER EMPLOYEE/MONTH',
        tag: 'EXECUTIVE'
      }
    ]
  },
  'hair-foam': {
    title: 'Prescription Hair Foam',
    subtitle: 'Medical-grade hair restoration',
    options: [
      {
        code: 'hair-foam-monthly',
        name: 'Monthly Subscription',
        price: '£110',
        desc: 'Prescription hair foam with 5 active ingredients for daily use. Includes consultation and monthly delivery.',
        duration: 'MONTHLY',
        tag: 'SUBSCRIPTION'
      }
    ]
  },
  'iv-therapy': {
    title: 'IV Therapy Options',
    subtitle: 'Select your infusion',
    options: [
      {
        code: 'deluxe-recovery',
        name: 'Deluxe Recovery IV',
        price: '£350',
        desc: 'Our strongest IV therapy with high-dose vitamins, minerals, and antioxidants.',
        duration: '60 MINS',
        tag: 'FULL SPECTRUM'
      },
      {
        code: 'immunity-boost',
        name: 'Immunity Boost IV',
        price: '£250',
        desc: 'High-dose Vitamin C, Zinc, and B-vitamins to support immune function.',
        duration: '45 MINS',
        tag: 'HIGH DOSE C'
      },
      {
        code: 'energy-performance',
        name: 'Energy & Performance',
        price: '£300',
        desc: 'B-vitamins, amino acids, and CoQ10 for sustained energy and mental clarity.',
        duration: '45 MINS',
        tag: 'B-COMPLEX'
      },
      {
        code: 'hydration',
        name: 'Recovery & Hydration',
        price: '£200',
        desc: 'Fast rehydration with electrolytes and minerals. Perfect after exercise or illness.',
        duration: '30 MINS',
        tag: 'HANGOVER FIX'
      },
      {
        code: 'nad-plus',
        name: 'NAD+ Therapy',
        price: '£450',
        desc: 'NAD+ infusion for cellular health, brain function, and healthy ageing.',
        duration: '90 MINS',
        tag: 'LONGEVITY'
      },
      {
        code: 'beauty-glow',
        name: 'Beauty Glow IV',
        price: '£320',
        desc: 'Glutathione, biotin, and vitamin C for radiant skin, hair, and nails.',
        duration: '45 MINS',
        tag: 'SKIN & HAIR'
      }
    ]
  },
  'weight-loss': {
    title: 'Weight Management',
    subtitle: 'Transform your body',
    options: [
      {
        code: 'weight-consultation',
        name: 'Weight Loss Consultation',
        price: '£110',
        desc: 'Comprehensive consultation with a specialist doctor to discuss your weight loss goals and create a personalized treatment plan. £50 redeemable on treatment.',
        duration: '30 MINUTES',
        tag: 'CONSULTATION'
      },
      {
        code: 'basic-weight',
        name: 'Foundation',
        price: '£250/month',
        desc: 'Comprehensive medical weight management including prescription medication (if clinically appropriate), monthly doctor consultations, and nutritional support.',
        duration: '6 MONTHS',
        tag: 'FOUNDATION'
      },
      {
        code: 'complete-weight',
        name: 'Complete',
        price: '£450/month',
        desc: 'Our most comprehensive programme with enhanced support, regular monitoring, and extended medication coverage for sustained results and long-term success.',
        duration: '12 MONTHS',
        tag: 'COMPREHENSIVE'
      },
      {
        code: 'glp1-weight',
        name: 'Elite',
        price: '£850/month',
        desc: 'Premium all-inclusive programme with dedicated doctor, weekly support, comprehensive testing, and personalized optimization for maximum results and accountability.',
        duration: '12 MONTHS',
        tag: 'CONCIERGE'
      }
    ]
  },
  'blood-tests': {
    title: 'Blood Test Panels',
    subtitle: 'Know your numbers',
    options: [
      {
        code: 'lifestyle-panel',
        name: 'Lifestyle Panel',
        price: '£400',
        desc: 'Core health markers including cholesterol, liver, kidney, vitamins, and inflammation.',
        duration: '30 MINS',
        tag: '37 MARKERS'
      },
      {
        code: 'lifestyle-hormone',
        name: 'Hormone Panel',
        price: '£500',
        desc: 'Everything in Lifestyle plus thyroid, testosterone, oestrogen, and cortisol testing.',
        duration: '30 MINS',
        tag: '52 MARKERS'
      },
      {
        code: 'advanced-panel',
        name: 'Executive Panel',
        price: '£650',
        desc: '60+ biomarkers including genetic risk factors and supplement recommendations.',
        duration: '45 MINS',
        tag: '60+ MARKERS'
      }
    ]
  },
  'prp': {
    title: 'PRP Treatments',
    subtitle: 'Natural regeneration',
    options: [
      {
        code: 'joint-prp',
        name: 'Joint PRP Therapy',
        price: '£650',
        desc: 'PRP injections for joint pain plus collagen supplements for ongoing support.',
        duration: '60 MINS',
        tag: 'KNEE • HIP • SHOULDER'
      },
      {
        code: 'hair-prp',
        name: 'Hair PRP',
        price: '£395',
        desc: 'PRP injections to improve hair density and reduce thinning.',
        duration: '45 MINS',
        tag: 'HAIR LOSS'
      },
      {
        code: 'hair-complete',
        name: 'Hair Complete',
        price: '£545',
        desc: 'PRP therapy plus prescription medications and targeted supplements.',
        duration: '60 MINS',
        tag: 'PRP + MEDS'
      },
      {
        code: 'facial-prp',
        name: 'Vampire Facial',
        price: '£415',
        desc: 'PRP facial treatment to improve texture, tone, and natural glow.',
        duration: '75 MINS',
        tag: 'COLLAGEN BOOST'
      }
    ]
  },
  'private-gp': {
    title: 'Private GP Services',
    subtitle: 'Expert medical care',
    options: [
      {
        code: 'gp-telephone',
        name: 'Telephone Consultation',
        price: '£49',
        desc: 'Convenient phone consultation for non-urgent medical advice and prescriptions.',
        duration: '15 MINS',
        tag: 'TELEPHONE'
      },
      {
        code: 'gp-classic',
        name: 'Classic Appointment',
        price: '£150',
        desc: 'Full consultation with examination, diagnosis, and treatment plan.',
        duration: '30 MINS',
        tag: 'NEXT DAY'
      },
      {
        code: 'gp-same-day',
        name: 'Same Day Urgent',
        price: '£220',
        desc: 'See a doctor today for urgent medical concerns. Appointments available within hours.',
        duration: '30 MINS',
        tag: 'TODAY'
      },
      {
        code: 'medical-report',
        name: 'Medical Report',
        price: '£250',
        desc: 'Official medical documentation for insurance, legal, or travel needs.',
        duration: '48 HOURS',
        tag: 'FAST TURNAROUND'
      }
    ]
  },
  'medical-imaging': {
    title: 'Medical Imaging',
    subtitle: 'Advanced diagnostic scans',
    options: [
      {
        code: 'mri-scan',
        name: 'MRI Scan',
        price: '£495',
        desc: 'High-resolution 3T MRI for detailed imaging of soft tissues, brain, spine, joints, and organs. Includes GP referral letter and consultant radiologist report.',
        duration: '45-60 MINS',
        tag: '3T SCANNER'
      },
      {
        code: 'ct-scan',
        name: 'CT Scan',
        price: '£550',
        desc: 'Ultra-fast 128-slice CT for comprehensive body imaging, cardiac, and vascular studies. Low-dose protocols with 3D reconstruction available.',
        duration: '15-30 MINS',
        tag: '128-SLICE'
      },
      {
        code: 'ultrasound',
        name: 'Ultrasound',
        price: '£245',
        desc: 'Dynamic real-time imaging for pregnancy, abdomen, pelvis, and vascular studies. 4D pregnancy scans and Doppler studies available.',
        duration: '20-40 MINS',
        tag: '4D AVAILABLE'
      },
      {
        code: 'xray',
        name: 'X-Ray',
        price: '£95',
        desc: 'Digital radiography for bones, chest, and spine with immediate image availability. Minimal radiation dose with instant results.',
        duration: '10 MINS',
        tag: 'INSTANT RESULTS'
      },
      {
        code: 'full-body-mri',
        name: 'Full Body MRI',
        price: '£1,795',
        desc: 'Comprehensive whole-body screening for early detection. Head to pelvis coverage including cancer screening and aneurysm detection.',
        duration: '90 MINS',
        tag: 'FULL SCREENING'
      }
    ]
  },
  'facial-treatments': {
    title: 'Medical Facials',
    subtitle: 'Clinical skincare',
    options: [
      {
        code: 'korean-glass',
        name: 'Korean Glass Skin',
        price: '£195',
        desc: '7-step K-beauty facial for translucent, dewy skin with deep hydration.',
        duration: '90 MINS',
        tag: '7 STEPS'
      },
      {
        code: 'cellular-renewal',
        name: 'Cellular Renewal Pro',
        price: '£275',
        desc: 'Microneedling with growth factors and LED therapy to reduce fine lines.',
        duration: '120 MINS',
        tag: 'MICRONEEDLING'
      },
      {
        code: 'nasa-led',
        name: 'NASA LED Therapy',
        price: '£225',
        desc: 'Red light therapy originally developed by NASA. Stimulates collagen and healing.',
        duration: '60 MINS',
        tag: 'RED LIGHT'
      }
    ]
  },
  'combined-adhd-autism-assessment': {
    title: 'ADHD & Autism Assessments',
    subtitle: 'Professional diagnostic evaluations',
    options: [
      {
        code: 'adhd-assessment',
        name: 'Adult ADHD Assessment',
        price: '£1,800',
        desc: 'Comprehensive evaluation for attention deficit hyperactivity disorder in adults aged 18+. Includes 3-hour clinical interview, QB Test computerised assessment, school reports review, family history evaluation, medication prescription if appropriate, shared care with NHS GP, and follow-up support.',
        duration: '3 HOURS',
        tag: 'FULL ASSESSMENT'
      },
      {
        code: 'combined-adhd-autism-assessment',
        name: 'Combined ADHD & Autism',
        price: '£2,995',
        desc: 'Dual assessment for both ADHD and autism spectrum conditions in one comprehensive evaluation. Includes 5-hour comprehensive assessment, ADOS-2 autism diagnostic tool, QB Test for ADHD, developmental history review, sensory profile assessment, two specialist reports, treatment plan & support, and 6-month follow-up care.',
        duration: '5 HOURS',
        tag: 'MOST POPULAR'
      },
      {
        code: 'autism-assessment',
        name: 'Adult Autism Assessment',
        price: '£2,200',
        desc: 'Specialist assessment for autism spectrum disorder in adults, including Asperger\'s syndrome. Includes 4-hour diagnostic assessment, ADOS-2 gold standard testing, developmental history, cognitive assessment, sensory processing evaluation, detailed diagnostic report, and post-diagnosis support.',
        duration: '4 HOURS',
        tag: 'FULL ASSESSMENT'
      }
    ]
  },
  'ed-sildenafil': {
    title: 'Sildenafil Treatment',
    subtitle: 'Generic Viagra - Most affordable ED solution',
    options: [
      {
        code: 'ed-sildenafil',
        name: 'Sildenafil (Generic Viagra)',
        price: '£50',
        desc: 'The most popular ED medication. Works within 30-60 minutes and lasts 4-6 hours. Best taken on empty stomach. Effective in 30-60 minutes, lasts 4-6 hours, most affordable option, 25mg/50mg/100mg doses, proven safety profile.',
        duration: 'PER MONTH',
        tag: 'MOST AFFORDABLE'
      }
    ]
  },
  'ed-tadalafil': {
    title: 'Tadalafil Treatment',
    subtitle: 'Generic Cialis - The weekend pill',
    options: [
      {
        code: 'ed-tadalafil',
        name: 'Tadalafil (Generic Cialis)',
        price: '£65',
        desc: 'The weekend pill. Lasts up to 36 hours for spontaneous intimacy. Can be taken daily for continuous coverage. Lasts up to 36 hours, daily option available, works with food/alcohol, more spontaneous, fewer side effects.',
        duration: 'PER MONTH',
        tag: 'MOST POPULAR'
      }
    ]
  },
  'ed-viagra': {
    title: 'Viagra Connect',
    subtitle: 'Branded Viagra - Original blue pill',
    options: [
      {
        code: 'ed-viagra',
        name: 'Viagra Connect (Branded)',
        price: '£75',
        desc: 'The original blue pill. Same active ingredient as sildenafil but branded formulation some men prefer. Original branded medication, 50mg standard dose, works in 30-60 minutes, lasts 4-6 hours, trusted by millions.',
        duration: 'PER MONTH',
        tag: 'BRANDED'
      }
    ]
  },
  'ed-spedra': {
    title: 'Spedra Treatment',
    subtitle: 'Fastest acting ED medication',
    options: [
      {
        code: 'ed-spedra',
        name: 'Spedra (Fastest Acting)',
        price: '£85',
        desc: 'Works in as little as 15 minutes. Ideal for spontaneous moments with fewer side effects. Works in 15 minutes, lasts 4-6 hours, can take with food, fewer side effects, latest generation.',
        duration: 'PER MONTH',
        tag: 'FASTEST'
      }
    ]
  },
  'ed-daily': {
    title: 'Daily Tadalafil',
    subtitle: 'Continuous coverage solution',
    options: [
      {
        code: 'ed-daily',
        name: 'Daily Tadalafil',
        price: '£95',
        desc: 'Low-dose daily pill for men who want to be ready anytime. No planning needed. Take once daily, always ready, no timing needed, improves urinary symptoms, 2.5mg or 5mg doses.',
        duration: 'PER MONTH',
        tag: 'CONTINUOUS'
      }
    ]
  },
  'ed-consultation': {
    title: 'ED Consultation',
    subtitle: 'Professional erectile dysfunction assessment',
    options: [
      {
        code: 'ed-consultation',
        name: 'ED Consultation',
        price: '£180',
        desc: 'Comprehensive consultation with our specialist doctor. Discuss your symptoms, medical history, and treatment options. Includes personalised treatment plan and ongoing support.',
        duration: 'CONSULTATION',
        tag: 'PROFESSIONAL'
      },
      {
        code: 'combination-therapy',
        name: 'Combination Therapy',
        price: '£250',
        desc: 'For men who haven\'t responded to single medications. Combines treatments for maximum effectiveness. Personalised combination, doctor-supervised, maximum effectiveness, testosterone options, injection therapy available.',
        duration: 'CONSULTATION',
        tag: 'ADVANCED'
      }
    ]
  },
  'ed-assessment': {
    title: 'Free ED Assessment',
    subtitle: 'Quick online health assessment',
    options: [
      {
        code: 'ed-assessment',
        name: 'Free ED Assessment',
        price: 'FREE',
        desc: 'Quick online questionnaire to assess your erectile dysfunction symptoms and determine the best treatment approach. Takes just 5 minutes and provides instant recommendations.',
        duration: '5 MINS',
        tag: 'FREE'
      }
    ]
  },
  'ed-free-consultation': {
    title: 'Free ED Consultation',
    subtitle: 'Complimentary consultation with ED specialist',
    options: [
      {
        code: 'ed-free-consultation',
        name: 'Free ED Consultation',
        price: 'FREE',
        originalPrice: '£150',
        desc: 'Complimentary consultation with our erectile dysfunction specialist. Discuss your symptoms confidentially, get professional advice, and create a personalized treatment plan. No obligation.',
        duration: '20 MINS',
        tag: 'LIMITED OFFER'
      }
    ]
  },
  'essential-executive-health': {
    title: 'Essential Executive Health',
    subtitle: 'Core health screening for professionals',
    options: [
      {
        code: 'essential-executive-health',
        name: 'Essential Executive',
        price: '£695',
        desc: 'Comprehensive baseline assessment covering all major health markers and organ systems. Includes full blood analysis (50+ markers), ECG & blood pressure, body composition scan, lung function test, vision & hearing check, 30-minute doctor consultation, and personalised health report.',
        duration: '2-3 HOURS',
        tag: 'CORE SCREENING'
      }
    ]
  },
  'premier-executive-health': {
    title: 'Premier Executive Health',
    subtitle: 'Advanced health optimisation',
    options: [
      {
        code: 'premier-executive-health',
        name: 'Premier Executive',
        price: '£2,495',
        desc: 'Our most comprehensive assessment including advanced imaging and specialist screenings. Everything in Essential plus full-body MRI scan, cardiac CT calcium score, advanced cancer markers, hormone profiling, genetic risk assessment, cognitive function testing, 60-minute specialist review, and 3-month follow-up included.',
        duration: '4-5 HOURS',
        tag: 'MOST POPULAR'
      }
    ]
  },
  'ultimate-executive-health': {
    title: 'Ultimate Executive Health',
    subtitle: 'Bespoke health experience',
    options: [
      {
        code: 'ultimate-executive-health',
        name: 'Ultimate Executive',
        price: '£9,995',
        desc: 'Fully personalised assessment with specialist consultations and ongoing support. Everything in Premier plus PET-CT scan, coronary angiography, sleep study assessment, nutritionist consultation, personal trainer session, quarterly reviews (1 year), 24/7 medical concierge, and home visit options.',
        duration: 'FULL DAY',
        tag: 'BESPOKE'
      }
    ]
  },
  'executive-health-consultation': {
    title: 'Executive Health Consultation',
    subtitle: 'Initial health assessment consultation',
    options: [
      {
        code: 'executive-health-consultation',
        name: 'Executive Health Consultation',
        price: '£150',
        desc: 'Initial consultation with our executive health specialist to discuss your health goals, assess your needs, and recommend the most appropriate screening package for your lifestyle and requirements.',
        duration: '45 MINS',
        tag: 'CONSULTATION'
      }
    ]
  },
  'fertility-testing': {
    title: 'Fertility Testing',
    subtitle: 'Comprehensive fertility assessment',
    options: [
      {
        code: 'fertility-testing',
        name: 'Fertility Testing',
        price: '£495',
        desc: 'Comprehensive fertility assessments for couples and individuals. Understand your fertility potential. Includes AMH & hormone testing, ultrasound scanning, semen analysis, tubal assessment, and detailed report & plan.',
        duration: 'FULL ASSESSMENT',
        tag: 'COMPREHENSIVE'
      }
    ]
  },
  'natural-ivf': {
    title: 'Natural Cycle IVF',
    subtitle: 'Minimal stimulation IVF approach',
    options: [
      {
        code: 'natural-ivf',
        name: 'Natural Cycle IVF',
        price: '£2,995',
        desc: 'Minimal stimulation approach using your natural cycle. Fewer drugs, lower cost, reduced side effects. Includes no/minimal drugs, natural egg selection, reduced side effects, lower cost option, and multiple cycles possible.',
        duration: 'PER CYCLE',
        tag: 'NATURAL APPROACH'
      }
    ]
  },
  'fertility-consultation': {
    title: 'Fertility Consultation',
    subtitle: 'Initial fertility assessment consultation',
    options: [
      {
        code: 'fertility-consultation',
        name: 'Fertility Consultation',
        price: 'FREE',
        desc: 'Free initial consultation to discuss your fertility journey, understand your options, and create a personalized treatment plan. Take the first step towards building your family.',
        duration: '45 MINS',
        tag: 'FREE'
      }
    ]
  },
  'hormone-consultation': {
    title: 'Hormone Therapy Consultation',
    subtitle: 'Initial hormone assessment consultation',
    options: [
      {
        code: 'hormone-consultation',
        name: 'Hormone Therapy Consultation',
        price: '£150',
        desc: 'Comprehensive consultation to assess your hormone levels and discuss treatment options. Includes review of symptoms, medical history, and personalized treatment recommendations.',
        duration: '60 MINS',
        tag: 'CONSULTATION'
      }
    ]
  },
  'womens-hrt': {
    title: 'Women\'s Hormone Replacement',
    subtitle: 'Bioidentical hormone therapy for women',
    options: [
      {
        code: 'womens-hrt',
        name: 'Women\'s Hormone Replacement',
        price: '£375',
        desc: 'Bioidentical hormone replacement therapy designed specifically for women. Includes comprehensive hormone panel testing, bioidentical hormone prescriptions, monthly monitoring & adjustments, and 24/7 clinical support.',
        duration: 'PER MONTH',
        tag: 'BIOIDENTICAL'
      }
    ]
  },
  'mens-testosterone': {
    title: 'Men\'s Testosterone Optimisation',
    subtitle: 'Testosterone replacement therapy for men',
    options: [
      {
        code: 'mens-testosterone',
        name: 'Men\'s Testosterone Optimisation',
        price: '£425',
        desc: 'Evidence-based testosterone replacement therapy to restore vitality, strength and drive. Includes complete male hormone analysis, testosterone & HCG protocols, estrogen management, and performance monitoring.',
        duration: 'PER MONTH',
        tag: 'OPTIMISATION'
      }
    ]
  },
  'thyroid-treatment': {
    title: 'Thyroid Restoration',
    subtitle: 'Comprehensive thyroid hormone optimisation',
    options: [
      {
        code: 'thyroid-treatment',
        name: 'Thyroid Restoration',
        price: '£350',
        desc: 'Comprehensive thyroid hormone optimisation for those failed by standard treatment. Including T3/T4 combination therapy. Includes full thyroid panel & antibodies, customised medication protocols, nutritional optimisation, and symptom resolution tracking.',
        duration: 'PER MONTH',
        tag: 'RESTORATION'
      }
    ]
  },
  'adrenal-recovery': {
    title: 'Adrenal Recovery Programme',
    subtitle: 'Restore energy and resilience',
    options: [
      {
        code: 'adrenal-recovery',
        name: 'Adrenal Recovery Programme',
        price: '£295',
        desc: 'Restore energy and resilience by optimising cortisol, DHEA and the entire stress response system. Includes 4-point cortisol mapping, adaptogenic protocols, stress resilience training, and sleep optimisation.',
        duration: 'PER MONTH',
        tag: 'RECOVERY'
      }
    ]
  },
  'peptide-therapy': {
    title: 'Peptide Therapy',
    subtitle: 'Next-generation peptide treatments',
    options: [
      {
        code: 'peptide-therapy',
        name: 'Peptide Therapy',
        price: '£550',
        desc: 'Next-generation peptides for growth hormone optimisation, cellular repair and longevity enhancement. Includes growth hormone secretagogues, tissue repair peptides, cognitive enhancement protocols, and anti-ageing compounds.',
        duration: 'PER MONTH',
        tag: 'ADVANCED'
      }
    ]
  },
  'executive-protocol': {
    title: 'Executive Performance Protocol',
    subtitle: 'Comprehensive hormone optimisation',
    options: [
      {
        code: 'executive-protocol',
        name: 'Executive Performance Protocol',
        price: '£850',
        desc: 'Comprehensive hormone optimisation for peak mental and physical performance. Our most advanced programme. Includes complete endocrine optimisation, cognitive enhancement therapy, executive health monitoring, and concierge clinical support.',
        duration: 'PER MONTH',
        tag: 'PREMIUM'
      }
    ]
  },
  'free-hormone-consultation': {
    title: 'Free Hormone Consultation',
    subtitle: 'Complimentary hormone assessment',
    options: [
      {
        code: 'free-hormone-consultation',
        name: 'Free Hormone Consultation',
        price: 'FREE',
        originalPrice: '£150',
        desc: 'Complimentary consultation to discuss your hormone concerns and treatment options. Get expert advice on hormone optimization and create a personalized treatment plan. No obligation.',
        duration: '30 MINS',
        tag: 'LIMITED OFFER'
      }
    ]
  },
  'iv-0': {
    title: 'Myers Cocktail',
    subtitle: 'The ultimate wellness booster',
    options: [
      {
        code: 'iv-0',
        name: 'Myers Cocktail',
        price: '£195',
        desc: 'Our signature blend for immediate energy, immunity, and overall wellness. Includes high-dose Vitamin C, B-Complex vitamins, Magnesium, Calcium, and B12 boost.',
        duration: '30 MINS',
        tag: 'MOST POPULAR'
      }
    ]
  },
  'iv-1': {
    title: 'Energy Boost',
    subtitle: 'Beat fatigue & brain fog',
    options: [
      {
        code: 'iv-1',
        name: 'Energy Boost',
        price: '£175',
        desc: 'Combat chronic fatigue and mental exhaustion. Get your spark back. Includes B-Complex, Amino acids, Taurine, and CoQ10.',
        duration: '30 MINS',
        tag: 'ENERGY'
      }
    ]
  },
  'iv-2': {
    title: 'Immunity Shield',
    subtitle: 'Ultimate immune support',
    options: [
      {
        code: 'iv-2',
        name: 'Immunity Shield',
        price: '£225',
        desc: 'Supercharge your immune system. Perfect for travel, flu season, or when feeling run down. Includes High-dose Vitamin C, Zinc, Selenium, Glutathione, and Lysine.',
        duration: '45 MINS',
        tag: 'IMMUNITY'
      }
    ]
  },
  'iv-3': {
    title: 'Beauty Glow',
    subtitle: 'Skin, hair & nails',
    options: [
      {
        code: 'iv-3',
        name: 'Beauty Glow',
        price: '£275',
        desc: 'Rejuvenate from within. Promotes collagen production, reduces wrinkles, creates radiant skin. Includes Glutathione, Vitamin C, Biotin, Zinc, and Collagen boosters.',
        duration: '45 MINS',
        tag: 'BEAUTY'
      }
    ]
  },
  'iv-4': {
    title: 'Hangover Recovery',
    subtitle: 'Party recovery protocol',
    options: [
      {
        code: 'iv-4',
        name: 'Hangover Recovery',
        price: '£175',
        desc: 'Rapid relief from hangover symptoms. Rehydrate, detox, and feel human again in under an hour. Includes Saline solution, Anti-nausea medication, B-Complex, Magnesium, and Pain relief.',
        duration: '30 MINS',
        tag: 'RECOVERY'
      }
    ]
  },
  'iv-5': {
    title: 'Athletic Performance',
    subtitle: 'Pre/Post workout',
    options: [
      {
        code: 'iv-5',
        name: 'Athletic Performance',
        price: '£255',
        desc: 'Optimise performance and recovery. Used by professional athletes for peak condition. Includes Amino acids, L-Carnitine, Electrolytes, B-vitamins, and Magnesium.',
        duration: '45 MINS',
        tag: 'PERFORMANCE'
      }
    ]
  },
  'iv-6': {
    title: 'NAD+ Therapy',
    subtitle: 'Anti-ageing & brain health',
    options: [
      {
        code: 'iv-6',
        name: 'NAD+ Therapy',
        price: '£450',
        desc: 'Cutting-edge cellular regeneration therapy. Improves mental clarity, energy, and slows ageing. Includes NAD+ (500mg), Amino acids, B-vitamins, Minerals, and Antioxidants.',
        duration: '90 MINS',
        tag: 'PREMIUM'
      }
    ]
  },
  'iv-7': {
    title: 'Weight Loss Support',
    subtitle: 'Metabolism boost',
    options: [
      {
        code: 'iv-7',
        name: 'Weight Loss Support',
        price: '£195',
        desc: 'Accelerate fat burning and boost metabolism. Complements diet and exercise programmes. Includes L-Carnitine, MIC (Methionine, Inositol, Choline), B12, Chromium, and Taurine.',
        duration: '30 MINS',
        tag: 'METABOLISM'
      }
    ]
  },
  'iv-8': {
    title: 'Custom Blend',
    subtitle: 'Personalised formula',
    options: [
      {
        code: 'iv-8',
        name: 'Custom Blend',
        price: '£350',
        desc: 'Work with our medical team to create your perfect IV therapy based on blood tests and health goals. Includes Blood test analysis, Tailored ingredients, Dose optimisation, and Progress tracking.',
        duration: '60 MINS',
        tag: 'BESPOKE'
      }
    ]
  },
  'iv-therapy-consultation': {
    title: 'IV Therapy Consultation',
    subtitle: 'Start your wellness journey',
    options: [
      {
        code: 'iv-therapy-consultation',
        name: 'IV Therapy Consultation',
        price: 'FREE',
        originalPrice: '£75',
        desc: 'Free consultation with our medical team to discuss your health goals and recommend the perfect IV therapy treatment for your needs. Includes health assessment and personalized recommendations.',
        duration: '30 MINS',
        tag: 'FREE CONSULTATION'
      }
    ]
  },
  'membership-0': {
    title: 'Essential Membership',
    subtitle: 'Regular IV therapy for optimal health',
    options: [
      {
        code: 'membership-0',
        name: 'Essential Membership',
        price: '£149',
        desc: 'Monthly IV therapy membership with great benefits. Includes 1 IV drip monthly, 15% off additional drips, free B12 shots, and priority booking.',
        duration: 'PER MONTH',
        tag: 'MEMBERSHIP'
      }
    ]
  },
  'membership-1': {
    title: 'Premium Membership',
    subtitle: 'Enhanced wellness package',
    options: [
      {
        code: 'membership-1',
        name: 'Premium Membership',
        price: '£399',
        desc: 'Premium monthly membership with enhanced benefits. Includes 2 IV drips monthly, 25% off additional drips, free vitamin injections, guest passes, and custom formulas.',
        duration: 'PER MONTH',
        tag: 'PREMIUM'
      }
    ]
  },
  'membership-2': {
    title: 'Elite Membership',
    subtitle: 'Ultimate wellness experience',
    options: [
      {
        code: 'membership-2',
        name: 'Elite Membership',
        price: '£799',
        desc: 'Elite membership with unlimited access and luxury services. Includes unlimited IV drips, NAD+ therapy included, home service available, quarterly blood tests, and concierge service.',
        duration: 'PER MONTH',
        tag: 'ELITE'
      }
    ]
  },
  'long-covid-consultation': {
    title: 'Long COVID Consultation',
    subtitle: 'Start your recovery journey',
    options: [
      {
        code: 'long-covid-consultation',
        name: 'Long COVID Consultation',
        price: 'FREE',
        desc: 'Complimentary consultation with our Long COVID specialists to assess your symptoms, understand your unique presentation, and create a personalized recovery plan.',
        duration: '45 MINS',
        tag: 'FREE CONSULTATION'
      }
    ]
  },
  'long-covid-1': {
    title: 'Comprehensive Assessment',
    subtitle: 'Full diagnostic workup',
    options: [
      {
        code: 'long-covid-1',
        name: 'Comprehensive Assessment',
        price: '£495',
        desc: 'Full diagnostic workup including advanced blood panels, autonomic testing, and cognitive assessment to understand your unique presentation. Includes 60+ biomarker analysis, cardiovascular assessment, neurological evaluation, and immune system profiling.',
        duration: 'COMPLETE ASSESSMENT',
        tag: 'DIAGNOSTIC'
      }
    ]
  },
  'long-covid-2': {
    title: 'Fatigue Recovery Protocol',
    subtitle: 'Targeted treatment for post-viral fatigue',
    options: [
      {
        code: 'long-covid-2',
        name: 'Fatigue Recovery Protocol',
        price: '£595',
        desc: 'Targeted treatment for post-viral fatigue using mitochondrial support, pacing strategies, and graduated exercise therapy. Includes energy metabolism testing, mitochondrial supplements, exercise physiology, and sleep optimisation.',
        duration: 'MONTHLY PROGRAMME',
        tag: 'ENERGY RECOVERY'
      }
    ]
  },
  'long-covid-3': {
    title: 'Cognitive Rehabilitation',
    subtitle: 'Comprehensive brain fog treatment',
    options: [
      {
        code: 'long-covid-3',
        name: 'Cognitive Rehabilitation',
        price: '£525',
        desc: 'Comprehensive brain fog treatment combining neurocognitive therapy, brain training, and targeted supplementation. Includes cognitive testing, memory enhancement, focus training, and neuroplasticity exercises.',
        duration: '8-WEEK PROGRAMME',
        tag: 'BRAIN HEALTH'
      }
    ]
  },
  'long-covid-4': {
    title: 'Respiratory Recovery',
    subtitle: 'Specialised breathing rehabilitation',
    options: [
      {
        code: 'long-covid-4',
        name: 'Respiratory Recovery',
        price: '£450',
        desc: 'Specialised breathing rehabilitation for persistent breathlessness, chest pain, and reduced exercise tolerance. Includes pulmonary function tests, breathing exercises, exercise tolerance training, and oxygen optimisation.',
        duration: '6-WEEK PROGRAMME',
        tag: 'BREATHING'
      }
    ]
  },
  'long-covid-5': {
    title: 'Autonomic Restoration',
    subtitle: 'Treatment for POTS and dysautonomia',
    options: [
      {
        code: 'long-covid-5',
        name: 'Autonomic Restoration',
        price: '£675',
        desc: 'Treatment for POTS, dysautonomia, and other autonomic dysfunction common in Long COVID. Includes heart rate variability testing, tilt table assessment, compression therapy, and medication management.',
        duration: 'TREATMENT PACKAGE',
        tag: 'AUTONOMIC'
      }
    ]
  },
  'long-covid-6': {
    title: 'Complete Recovery Programme',
    subtitle: 'Flagship 12-week intensive programme',
    options: [
      {
        code: 'long-covid-6',
        name: 'Complete Recovery Programme',
        price: '£1,250',
        desc: 'Our flagship 12-week intensive programme addressing all aspects of Long COVID with daily support. Includes multidisciplinary team, personalised protocols, 24/7 support line, and home care coordination.',
        duration: 'MONTHLY PROGRAMME',
        tag: 'COMPREHENSIVE'
      }
    ]
  },
  'medical-0': {
    title: 'Sick Note Now',
    subtitle: 'Immediate sick note service',
    options: [
      {
        code: 'medical-0',
        name: 'Sick Note Now',
        price: '£45',
        desc: 'Official fit note for employment. Valid for any UK employer. Can be backdated up to 7 days if medically appropriate.',
        duration: 'SAME DAY',
        tag: 'FAST TRACK'
      }
    ]
  },
  'medical-1': {
    title: 'Sick Notes (Fit Notes)',
    subtitle: 'Official employment documentation',
    options: [
      {
        code: 'medical-1',
        name: 'Sick Notes (Fit Notes)',
        price: '£45',
        desc: 'Official fit notes for employment. Valid for any UK employer. Can be backdated up to 7 days if medically appropriate.',
        duration: 'SAME DAY',
        tag: 'MOST REQUESTED'
      }
    ]
  },
  'medical-2': {
    title: 'Fitness to Fly',
    subtitle: 'Medical clearance for air travel',
    options: [
      {
        code: 'medical-2',
        name: 'Fitness to Fly',
        price: '£75',
        desc: 'Medical clearance for air travel. Required by airlines for pregnancy, recent surgery, or medical conditions.',
        duration: 'SAME DAY',
        tag: 'AIRLINE ACCEPTED'
      }
    ]
  },
  'medical-3': {
    title: 'Insurance Medical Reports',
    subtitle: 'Comprehensive reports for insurance',
    options: [
      {
        code: 'medical-3',
        name: 'Insurance Medical Reports',
        price: '£350',
        desc: 'Comprehensive medical reports for insurance claims, personal injury, or policy applications.',
        duration: '2-3 DAYS',
        tag: 'COURT COMPLIANT'
      }
    ]
  },
  'medical-4': {
    title: 'Visa Medical Certificates',
    subtitle: 'Embassy approved medical examinations',
    options: [
      {
        code: 'medical-4',
        name: 'Visa Medical Certificates',
        price: '£295',
        desc: 'Medical examinations for visa applications. Approved for UK, US, Canadian, Australian visas.',
        duration: '24 HOURS',
        tag: 'EMBASSY APPROVED'
      }
    ]
  },
  'medical-5': {
    title: 'Employment Health Checks',
    subtitle: 'Pre-employment medical assessments',
    options: [
      {
        code: 'medical-5',
        name: 'Employment Health Checks',
        price: '£195',
        desc: 'Pre-employment medical assessments and ongoing occupational health certificates.',
        duration: 'SAME DAY',
        tag: 'OCCUPATIONAL'
      }
    ]
  },
  'medical-6': {
    title: 'Sports & Fitness Certificates',
    subtitle: 'Medical clearance for sports',
    options: [
      {
        code: 'medical-6',
        name: 'Sports & Fitness Certificates',
        price: '£125',
        desc: 'Medical clearance for sports participation, gym membership, or competitive events.',
        duration: 'SAME DAY',
        tag: 'SPORTS CLEARANCE'
      }
    ]
  },
  'medical-7': {
    title: 'Driving Licence Medicals',
    subtitle: 'DVLA medical examinations',
    options: [
      {
        code: 'medical-7',
        name: 'Driving Licence Medicals',
        price: '£85',
        desc: 'DVLA medical examinations for HGV, PSV, taxi drivers, and medical condition declarations.',
        duration: 'SAME DAY',
        tag: 'DVLA APPROVED'
      }
    ]
  },
  'medical-8': {
    title: 'Legal & Court Reports',
    subtitle: 'Expert medical reports for legal proceedings',
    options: [
      {
        code: 'medical-8',
        name: 'Legal & Court Reports',
        price: '£750',
        desc: 'Expert medical reports for legal proceedings, disability claims, and tribunals.',
        duration: '5-7 DAYS',
        tag: 'EXPERT WITNESS'
      }
    ]
  },
  'medical-9': {
    title: 'Student Health Certificates',
    subtitle: 'Medical documentation for students',
    options: [
      {
        code: 'medical-9',
        name: 'Student Health Certificates',
        price: '£65',
        desc: 'Medical documentation for university admissions, exam deferrals, and accommodation needs.',
        duration: 'SAME DAY',
        tag: 'STUDENT SUPPORT'
      }
    ]
  },
  'medical-consultation': {
    title: 'Medical Report Consultation',
    subtitle: 'Get your medical report today',
    options: [
      {
        code: 'medical-consultation',
        name: 'Medical Report Consultation',
        price: '£150',
        desc: 'Fast, official documentation from qualified doctors. Choose from over 20 types of medical reports and certificates.',
        duration: 'CONSULTATION',
        tag: 'PROFESSIONAL'
      }
    ]
  },
  'mens-health-1': {
    title: 'Testosterone Optimisation',
    subtitle: 'Evidence-based TRT protocols',
    options: [
      {
        code: 'mens-health-1',
        name: 'Testosterone Optimisation',
        price: '£425',
        desc: 'Evidence-based TRT protocols tailored to your physiology. Restore strength, drive, and confidence with precision dosing.',
        duration: 'MONTHLY PROGRAMME',
        tag: 'BIOIDENTICAL'
      }
    ]
  },
  'mens-health-2': {
    title: 'Sexual Performance Protocol',
    subtitle: 'Comprehensive ED and sexual wellness',
    options: [
      {
        code: 'mens-health-2',
        name: 'Sexual Performance Protocol',
        price: '£595',
        desc: 'Comprehensive approach to ED and sexual wellness. Combining medications, shockwave therapy, and hormone optimisation.',
        duration: 'TREATMENT PACKAGE',
        tag: 'COMPREHENSIVE'
      }
    ]
  },
  'mens-health-3': {
    title: 'Executive Performance',
    subtitle: 'Premium programme for high achievers',
    options: [
      {
        code: 'mens-health-3',
        name: 'Executive Performance',
        price: '£950',
        desc: 'Premium programme for high achievers. Optimise cognition, energy, and resilience for peak professional performance.',
        duration: 'MONTHLY PROGRAMME',
        tag: 'PREMIUM'
      }
    ]
  },
  'mens-health-4': {
    title: 'Metabolic Restoration',
    subtitle: 'Reverse metabolic decline',
    options: [
      {
        code: 'mens-health-4',
        name: 'Metabolic Restoration',
        price: '£495',
        desc: 'Reverse metabolic decline with targeted interventions. Optimise body composition, insulin sensitivity, and energy production.',
        duration: 'MONTHLY PROGRAMME',
        tag: 'METABOLIC'
      }
    ]
  },
  'mens-health-5': {
    title: 'Hair Restoration Programme',
    subtitle: 'Multi-modal approach to hair loss',
    options: [
      {
        code: 'mens-health-5',
        name: 'Hair Restoration Programme',
        price: '£395',
        desc: 'Multi-modal approach to hair loss. Combining medications, PRP, and hormone optimisation for maximum regrowth.',
        duration: 'MONTHLY PROGRAMME',
        tag: 'HAIR REGROWTH'
      }
    ]
  },
  'mens-health-6': {
    title: 'Longevity Protocol',
    subtitle: 'Cutting-edge anti-ageing interventions',
    options: [
      {
        code: 'mens-health-6',
        name: 'Longevity Protocol',
        price: '£750',
        desc: 'Cutting-edge anti-ageing interventions. Extend healthspan with the latest in regenerative medicine and biohacking.',
        duration: 'MONTHLY PROGRAMME',
        tag: 'LONGEVITY'
      }
    ]
  },
  'mens-health-consultation': {
    title: 'Men\'s Health Consultation',
    subtitle: 'Complimentary men\'s health consultation',
    options: [
      {
        code: 'mens-health-consultation',
        name: 'Men\'s Health Consultation',
        price: 'FREE',
        originalPrice: '£150',
        desc: 'Book your complimentary men\'s health consultation today. Assess your hormone levels, discuss treatment options, and create a personalized optimization plan.',
        duration: '60 MINS',
        tag: 'FREE CONSULTATION'
      }
    ]
  },
  'mental-health-1': {
    title: 'Individual Therapy',
    subtitle: 'Personal one-on-one therapy sessions',
    options: [
      {
        code: 'mental-health-1',
        name: 'Individual Therapy',
        price: '£80',
        desc: '50-minute sessions with MHRA-registered therapists. CBT, psychodynamic, and humanistic approaches available. Same-day appointments available.',
        duration: 'PER SESSION',
        tag: 'MOST POPULAR'
      }
    ]
  },
  'mental-health-2': {
    title: 'Couples Therapy',
    subtitle: 'Relationship counselling for couples',
    options: [
      {
        code: 'mental-health-2',
        name: 'Couples Therapy',
        price: '£150',
        desc: '60-minute sessions focused on relationship counselling, communication skills development, and conflict resolution techniques. Flexible scheduling for both partners.',
        duration: 'PER SESSION',
        tag: 'RELATIONSHIP FOCUS'
      }
    ]
  },
  'mental-health-3': {
    title: 'Psychiatric Consultation',
    subtitle: 'Comprehensive psychiatric assessment',
    options: [
      {
        code: 'mental-health-3',
        name: 'Psychiatric Consultation',
        price: '£350',
        desc: 'Comprehensive assessment with GMC-registered psychiatrists. Includes medication management, treatment planning, and follow-up appointments available.',
        duration: 'INITIAL CONSULTATION',
        tag: 'COMPREHENSIVE'
      }
    ]
  },
  'mental-health-consultation': {
    title: 'Mental Health Consultation',
    subtitle: 'Start your mental health journey',
    options: [
      {
        code: 'mental-health-consultation',
        name: 'Mental Health Consultation',
        price: 'FREE',
        originalPrice: '£80',
        desc: 'Free 15-minute consultation to discuss your needs and match you with the right therapist and approach. Take the first step towards better mental health.',
        duration: '15 MINS',
        tag: 'FREE CONSULTATION'
      }
    ]
  },
  'prescription-1': {
    title: 'Repeat Prescription Refills',
    subtitle: 'Auto-refill service with delivery',
    options: [
      {
        code: 'prescription-1',
        name: 'Repeat Prescription Refills',
        price: '£35',
        desc: 'Auto-refill service with 3-6 month supplies. SMS reminders ensure you never miss a dose. Free next-day delivery included.',
        duration: 'REFILL FEE',
        tag: 'AUTO-REFILL'
      }
    ]
  },
  'prescription-2': {
    title: 'New Prescription Consultation',
    subtitle: '15-minute doctor consultation',
    options: [
      {
        code: 'prescription-2',
        name: 'New Prescription Consultation',
        price: '£85',
        desc: '15-minute GMC-doctor video or phone consultation. All UK medications available with same-day prescription issue.',
        duration: 'CONSULTATION',
        tag: '15 MINS'
      }
    ]
  },
  'prescription-3': {
    title: 'Emergency/Urgent Refill',
    subtitle: '2-hour turnaround service',
    options: [
      {
        code: 'prescription-3',
        name: 'Emergency/Urgent Refill',
        price: '£110',
        desc: '2-hour turnaround for urgent needs. Weekend & holiday coverage, lost medication replacement, travel top-ups.',
        duration: 'URGENT SERVICE',
        tag: '2 HOURS'
      }
    ]
  },
  'prescription-4': {
    title: 'NHS Transfer',
    subtitle: 'Free prescription transfer service',
    options: [
      {
        code: 'prescription-4',
        name: 'NHS Transfer',
        price: 'FREE',
        desc: 'Full NHS repeat-prescription takeover. We handle everything with your GP surgery. No transfer fee.',
        duration: 'TRANSFER SERVICE',
        tag: 'FREE'
      }
    ]
  },
  'prescription-5': {
    title: 'Travel Medication Packs',
    subtitle: 'Extended supply for travel',
    options: [
      {
        code: 'prescription-5',
        name: 'Travel Medication Packs',
        price: '£75',
        desc: 'Up to 6-month supply for extended travel. Includes customs certificates and cold-chain delivery where needed.',
        duration: 'PLUS MEDICATION COST',
        tag: '6 MONTHS'
      }
    ]
  },
  'prescription-6': {
    title: 'Premium Subscription Plan',
    subtitle: 'Monthly subscription with benefits',
    options: [
      {
        code: 'prescription-6',
        name: 'Premium Subscription Plan',
        price: '£50',
        desc: 'Up to 4 repeat refills per month, one 15-minute consultation included. Priority booking & 1-hour urgent service. Family add-ons available.',
        duration: 'PER MONTH',
        tag: 'MOST POPULAR'
      }
    ]
  },
  'prescription-consultation': {
    title: 'Free Prescription Consultation',
    subtitle: 'Start your prescription journey',
    options: [
      {
        code: 'prescription-consultation',
        name: 'Free Prescription Consultation',
        price: 'FREE',
        desc: 'Free 10-minute consultation with one of our medical experts. Take the first step towards optimising your health.',
        duration: '10 MINS',
        tag: 'FREE CONSULTATION'
      }
    ]
  },
  'private-gp-1': {
    title: 'Telephone Consultation',
    subtitle: 'Convenient phone consultation',
    options: [
      {
        code: 'private-gp-1',
        name: 'Telephone Consultation',
        price: '£49',
        desc: 'Convenient phone consultation with medical advice and guidance. Prescriptions if appropriate, sick notes available, follow-up recommendations.',
        duration: '15 MINUTES',
        tag: 'SAME DAY'
      }
    ]
  },
  'private-gp-2': {
    title: 'Classic Appointment',
    subtitle: 'Comprehensive examination',
    options: [
      {
        code: 'private-gp-2',
        name: 'Classic Appointment',
        price: '£150',
        desc: 'Comprehensive examination with diagnosis and treatment plan. Includes prescriptions if needed, sick notes available, and specialist referrals.',
        duration: '30 MINUTES',
        tag: 'NEXT DAY'
      }
    ]
  },
  'private-gp-3': {
    title: 'Same Day Urgent',
    subtitle: 'Priority same day appointment',
    options: [
      {
        code: 'private-gp-3',
        name: 'Same Day Urgent',
        price: '£220',
        desc: 'Everything in Classic Appointment plus same day priority booking for urgent health concerns. Immediate treatment plan and fast-track referrals.',
        duration: '30 MINUTES',
        tag: 'URGENT'
      }
    ]
  },
  'private-gp-4': {
    title: 'Medical Report',
    subtitle: 'Professional medical reports',
    options: [
      {
        code: 'private-gp-4',
        name: 'Medical Report',
        price: '£250',
        desc: 'Professional medical reports for insurance, employment, travel, and legal purposes. Including fit-to-fly certificates and visa medical examinations.',
        duration: '48 HOURS',
        tag: 'REPORTS'
      }
    ]
  },
  'private-gp-consultation': {
    title: 'Private GP Consultation',
    subtitle: 'Healthcare without the wait',
    options: [
      {
        code: 'private-gp-consultation',
        name: 'Private GP Consultation',
        price: 'FROM £49',
        desc: 'See an expert doctor today. Same-day appointments available. Choose from telephone, classic, urgent, or medical report consultations.',
        duration: 'CONSULTATION',
        tag: 'AVAILABLE NOW'
      }
    ]
  },
  'prp-hair': {
    title: 'PRP for Hair Loss',
    subtitle: 'Advanced hair restoration therapy',
    options: [
      {
        code: 'prp-hair',
        name: 'PRP for Hair Loss',
        price: 'From £395',
        desc: 'Advanced PRP therapy to reverse hair loss and stimulate new growth. Male pattern baldness treatment, female hair thinning solutions, scalp PRP injections.',
        duration: '60 MINUTES',
        tag: '3-4 SESSIONS'
      }
    ]
  },
  'prp-joints': {
    title: 'PRP for Joints',
    subtitle: 'Regenerative joint therapy',
    options: [
      {
        code: 'prp-joints',
        name: 'PRP for Joints',
        price: '£650',
        desc: 'Regenerative therapy for sports injuries, arthritis and chronic joint pain. Knee arthritis treatment, shoulder pain relief, tennis elbow therapy.',
        duration: '45 MINUTES',
        tag: '1-3 SESSIONS'
      }
    ]
  },
  'prp-facial': {
    title: 'PRP Facial Treatment',
    subtitle: 'Vampire facial therapy',
    options: [
      {
        code: 'prp-facial',
        name: 'PRP Facial Treatment',
        price: '£415',
        desc: 'The original Vampire Facial perfected. Deep tissue regeneration for luminous, youthful skin. Vampire facial therapy, skin rejuvenation, acne scar reduction.',
        duration: '60 MINUTES',
        tag: '3-4 SESSIONS'
      }
    ]
  },
  'prp-consultation': {
    title: 'PRP Consultation',
    subtitle: 'Discover your regenerative potential',
    options: [
      {
        code: 'prp-consultation',
        name: 'PRP Consultation',
        price: 'FREE',
        desc: 'Book your complimentary PRP consultation today. Discover your regenerative potential with platelet-rich plasma therapy.',
        duration: 'CONSULTATION',
        tag: 'FREE CONSULTATION'
      }
    ]
  },
  'prf-hair': {
    title: 'PRF for Hair Loss',
    subtitle: 'Advanced hair restoration therapy',
    options: [
      {
        code: 'prf-hair',
        name: 'PRF for Hair Loss',
        price: 'From £395',
        desc: 'Advanced PRF therapy to reverse hair loss and stimulate new growth. Male pattern baldness treatment, female hair thinning solutions, scalp PRF injections.',
        duration: '60 MINUTES',
        tag: '3-4 SESSIONS'
      }
    ]
  },
  'prf-joints': {
    title: 'PRF for Joints',
    subtitle: 'Regenerative joint therapy',
    options: [
      {
        code: 'prf-joints',
        name: 'PRF for Joints',
        price: '£650',
        desc: 'Regenerative therapy for sports injuries, arthritis and chronic joint pain. Knee arthritis treatment, shoulder pain relief, tennis elbow therapy.',
        duration: '45 MINUTES',
        tag: '1-3 SESSIONS'
      }
    ]
  },
  'prf-facial': {
    title: 'PRF Facial Treatment',
    subtitle: 'Advanced facial therapy',
    options: [
      {
        code: 'prf-facial',
        name: 'PRF Facial Treatment',
        price: '£415',
        desc: 'Advanced PRF facial for deep tissue regeneration and luminous, youthful skin. PRF facial therapy, skin rejuvenation, acne scar reduction.',
        duration: '60 MINUTES',
        tag: '3-4 SESSIONS'
      }
    ]
  },
  'prf-consultation': {
    title: 'PRF Consultation',
    subtitle: 'Discover your regenerative potential',
    options: [
      {
        code: 'prf-consultation',
        name: 'PRF Consultation',
        price: 'FREE',
        desc: 'Book your complimentary PRF consultation today. Discover your regenerative potential with platelet-rich fibrin therapy.',
        duration: 'CONSULTATION',
        tag: 'FREE CONSULTATION'
      }
    ]
  },
  'skin-cancer-screening': {
    title: 'Skin Cancer Screening',
    subtitle: 'Advanced AI-powered skin cancer detection',
    options: [
      {
        code: 'skin-cancer-full-body',
        name: 'Full Body Mole Mapping',
        price: '£495',
        desc: 'Comprehensive photographic documentation of every mole. AI analysis compares changes over time with sub-millimetre precision.',
        duration: '60-90 MINS',
        tag: 'COMPLETE MAPPING'
      }
    ]
  },
  'skin-cancer-express': {
    title: 'Express Skin Check',
    subtitle: 'Quick skin cancer assessment',
    options: [
      {
        code: 'skin-cancer-express',
        name: 'Express Skin Check',
        price: '£295',
        desc: 'Focused examination of concerning lesions by consultant dermatologist. Perfect for specific worries or annual check-ups.',
        duration: '30 MINS',
        tag: 'SINGLE SESSION'
      }
    ]
  },
  'skin-cancer-premium': {
    title: 'Premium Surveillance Programme',
    subtitle: 'Comprehensive skin cancer monitoring',
    options: [
      {
        code: 'skin-cancer-premium',
        name: 'Premium Surveillance Programme',
        price: '£1,250',
        desc: 'Comprehensive monitoring for high-risk individuals. Quarterly checks with immediate access to treatment if needed.',
        duration: 'ANNUAL',
        tag: 'ANNUAL PROGRAMME'
      }
    ]
  },
  'skin-cancer-biopsy': {
    title: 'Same-Day Biopsy Service',
    subtitle: 'Immediate biopsy for suspicious lesions',
    options: [
      {
        code: 'skin-cancer-biopsy',
        name: 'Same-Day Biopsy Service',
        price: '£450',
        desc: 'Immediate biopsy of suspicious lesions with rush pathology. Results within 48 hours instead of weeks.',
        duration: '30 MINS',
        tag: 'INCLUDING PATHOLOGY'
      }
    ]
  },
  'skin-cancer-pediatric': {
    title: 'Paediatric Screening',
    subtitle: 'Child-friendly skin cancer screening',
    options: [
      {
        code: 'skin-cancer-pediatric',
        name: 'Paediatric Screening',
        price: '£225',
        desc: 'Gentle, child-friendly screening for congenital moles and sun damage. Establishing lifetime skin health habits.',
        duration: '30 MINS',
        tag: 'PER CHILD'
      }
    ]
  },
  'skin-cancer-corporate': {
    title: 'Corporate Screening Days',
    subtitle: 'On-site team skin cancer screening',
    options: [
      {
        code: 'skin-cancer-corporate',
        name: 'Corporate Screening Days',
        price: '£175',
        desc: 'On-site screening for your team. Protecting your most valuable asset with convenient workplace health checks.',
        duration: '15 MINS',
        tag: 'PER EMPLOYEE'
      }
    ]
  },
  'sleep-assessment': {
    title: 'Sleep Assessment',
    subtitle: 'Comprehensive sleep evaluation',
    options: [
      {
        code: 'sleep-assessment',
        name: 'Sleep Assessment',
        price: 'FREE',
        desc: 'Free comprehensive sleep assessment to evaluate your sleep patterns and identify potential issues. Start your journey to better sleep.',
        duration: '30 MINS',
        tag: 'FREE CONSULTATION'
      }
    ]
  },
  'home-sleep-study': {
    title: 'Home Sleep Study',
    subtitle: 'Hospital-grade sleep monitoring at home',
    options: [
      {
        code: 'home-sleep-study',
        name: 'Home Sleep Study',
        price: '£395',
        desc: 'Hospital-grade sleep study in the comfort of your own bed. Comprehensive analysis of sleep stages, breathing, and movement patterns.',
        duration: '7 NIGHTS',
        tag: 'COMPLETE STUDY'
      }
    ]
  },
  'insomnia-programme': {
    title: 'Insomnia Programme',
    subtitle: 'Evidence-based insomnia treatment',
    options: [
      {
        code: 'insomnia-programme',
        name: 'Insomnia Programme',
        price: '£495',
        desc: 'Evidence-based CBT-I combined with advanced chronotherapy. Rebuild your sleep architecture from the ground up.',
        duration: '8 WEEKS',
        tag: 'MONTHLY PROGRAMME'
      }
    ]
  },
  'sleep-apnoea-treatment': {
    title: 'Sleep Apnoea Treatment',
    subtitle: 'Comprehensive sleep apnoea management',
    options: [
      {
        code: 'sleep-apnoea-treatment',
        name: 'Sleep Apnoea Treatment',
        price: '£650',
        desc: 'Comprehensive management including CPAP alternatives, oral appliances, and positional therapy for sleep apnoea.',
        duration: 'TREATMENT',
        tag: 'TREATMENT PACKAGE'
      }
    ]
  },
  'executive-sleep-optimisation': {
    title: 'Executive Sleep Optimisation',
    subtitle: 'Premium sleep programme for high performers',
    options: [
      {
        code: 'executive-sleep-optimisation',
        name: 'Executive Sleep Optimisation',
        price: '£850',
        desc: 'Premium programme for high performers. Maximise recovery, cognitive function, and daytime energy with personalized protocols.',
        duration: 'MONTHLY',
        tag: 'MONTHLY PROGRAMME'
      }
    ]
  },
  'circadian-rhythm-reset': {
    title: 'Circadian Rhythm Reset',
    subtitle: 'Advanced chronotherapy protocols',
    options: [
      {
        code: 'circadian-rhythm-reset',
        name: 'Circadian Rhythm Reset',
        price: '£425',
        desc: 'Advanced light therapy and chronobiology protocols for shift workers, jet lag, and circadian disorders.',
        duration: '6 WEEKS',
        tag: '6-WEEK PROGRAMME'
      }
    ]
  },
  'paediatric-sleep-clinic': {
    title: 'Paediatric Sleep Clinic',
    subtitle: 'Specialized sleep solutions for children',
    options: [
      {
        code: 'paediatric-sleep-clinic',
        name: 'Paediatric Sleep Clinic',
        price: '£395',
        desc: 'Specialised sleep solutions for children and adolescents. Gentle, effective approaches for the whole family.',
        duration: 'CONSULTATION',
        tag: 'CONSULTATION & PLAN'
      }
    ]
  },
  'sleep-consultation': {
    title: 'Sleep Consultation',
    subtitle: 'Expert sleep specialist consultation',
    options: [
      {
        code: 'sleep-consultation',
        name: 'Sleep Consultation',
        price: '£150',
        desc: 'Initial consultation with our sleep specialist to assess your sleep issues and create a personalized treatment plan.',
        duration: '45 MINS',
        tag: 'CONSULTATION'
      }
    ]
  },
  'virtual-consultation': {
    title: 'Virtual Consultation',
    subtitle: 'Convenient online medical consultation',
    options: [
      {
        code: 'virtual-consultation',
        name: 'Virtual Consultation',
        price: '49',
        desc: 'Convenient phone consultation to discuss your health concerns and receive medical advice and guidance.',
        duration: '15 MINS',
        tag: 'TELEPHONE CONSULTATION'
      }
    ]
  },
  'express-consultations': {
    title: 'Express Consultations',
    subtitle: 'Same-day virtual GP appointments',
    options: [
      {
        code: 'express-consultations',
        name: 'Express Consultations',
        price: '£95',
        desc: 'Same-day appointments with experienced GPs. Perfect for acute issues, prescriptions, and medical certificates.',
        duration: '15 MINS',
        tag: 'PER CONSULTATION'
      }
    ]
  },
  'specialist-consultations': {
    title: 'Specialist Consultations',
    subtitle: 'Virtual specialist appointments',
    options: [
      {
        code: 'specialist-consultations',
        name: 'Specialist Consultations',
        price: '£295',
        desc: 'Access to consultant-level specialists across 50+ medical fields. No GP referral required.',
        duration: '45 MINS',
        tag: 'PER CONSULTATION'
      }
    ]
  },
  'mental-health-support': {
    title: 'Mental Health Support',
    subtitle: 'Virtual psychological care',
    options: [
      {
        code: 'mental-health-support',
        name: 'Mental Health Support',
        price: '£195',
        desc: 'Comprehensive psychological care from clinical psychologists and psychiatrists. Immediate support when needed.',
        duration: '50 MINS',
        tag: 'PER SESSION'
      }
    ]
  },
  'chronic-care-management': {
    title: 'Chronic Care Management',
    subtitle: 'Continuous virtual care for chronic conditions',
    options: [
      {
        code: 'chronic-care-management',
        name: 'Chronic Care Management',
        price: '£395',
        desc: 'Continuous virtual care for chronic conditions. Regular monitoring, medication management, lifestyle support.',
        duration: 'MONTHLY',
        tag: 'MONTHLY PROGRAMME'
      }
    ]
  },
  'second-opinion-service': {
    title: 'Second Opinion Service',
    subtitle: 'Expert medical record review',
    options: [
      {
        code: 'second-opinion-service',
        name: 'Second Opinion Service',
        price: '£450',
        desc: 'Expert review of diagnoses and treatment plans by leading specialists. Peace of mind for critical decisions.',
        duration: '60 MINS',
        tag: 'COMPLETE REVIEW'
      }
    ]
  },
  'corporate-wellness-virtual': {
    title: 'Corporate Wellness',
    subtitle: 'Virtual healthcare for teams',
    options: [
      {
        code: 'corporate-wellness-virtual',
        name: 'Corporate Wellness',
        price: '£45',
        desc: 'Virtual healthcare for your entire team. Reduce sick days, improve productivity, show you care.',
        duration: 'MONTHLY',
        tag: 'PER EMPLOYEE/MONTH'
      }
    ]
  },
  'womens-health-consultation': {
    title: 'Women\'s Health Consultation',
    subtitle: 'Expert consultation for women\'s health concerns',
    options: [
      {
        code: 'womens-health-consultation',
        name: 'Women\'s Health Consultation',
        price: 'FREE',
        desc: 'Free initial consultation to discuss your women\'s health concerns and create a personalized treatment plan.',
        duration: '30 MINS',
        tag: 'FREE CONSULTATION'
      }
    ]
  },
  'menopause-management': {
    title: 'Menopause Management',
    subtitle: 'Complete menopause care with bioidentical HRT',
    options: [
      {
        code: 'menopause-management',
        name: 'Menopause Management',
        price: '£395',
        desc: 'Complete care through perimenopause and beyond. Bioidentical HRT tailored to your unique hormonal blueprint.',
        duration: 'MONTHLY',
        tag: 'MONTHLY PROGRAMME'
      }
    ]
  },
  'perimenopause-protocol': {
    title: 'Perimenopause Protocol',
    subtitle: 'Early intervention for hormonal transitions',
    options: [
      {
        code: 'perimenopause-protocol',
        name: 'Perimenopause Protocol',
        price: '£425',
        desc: 'Early intervention for hormonal chaos. Smooth the transition with precision hormone balancing.',
        duration: 'MONTHLY',
        tag: 'MONTHLY PROGRAMME'
      }
    ]
  },
  'sexual-wellness-revival': {
    title: 'Sexual Wellness Revival',
    subtitle: 'Comprehensive sexual health restoration',
    options: [
      {
        code: 'sexual-wellness-revival',
        name: 'Sexual Wellness Revival',
        price: '£595',
        desc: 'Restore intimacy and pleasure. Comprehensive treatment for libido, dryness, and sexual satisfaction.',
        duration: 'TREATMENT',
        tag: 'TREATMENT PACKAGE'
      }
    ]
  },
  'bone-heart-health': {
    title: 'Bone & Heart Health',
    subtitle: 'Protective protocols for post-menopausal health',
    options: [
      {
        code: 'bone-heart-health',
        name: 'Bone & Heart Health',
        price: '£495',
        desc: 'Protective protocols for post-menopausal health. Prevent osteoporosis and cardiovascular disease.',
        duration: 'QUARTERLY',
        tag: 'QUARTERLY PROGRAMME'
      }
    ]
  },
  'pcos-management': {
    title: 'PCOS Management',
    subtitle: 'Comprehensive polycystic ovary syndrome care',
    options: [
      {
        code: 'pcos-management',
        name: 'PCOS Management',
        price: '£395',
        desc: 'Comprehensive care for polycystic ovary syndrome. Balance hormones, restore cycles, optimise fertility.',
        duration: 'MONTHLY',
        tag: 'MONTHLY PROGRAMME'
      }
    ]
  },
  'executive-womens-health': {
    title: 'Executive Women\'s Health',
    subtitle: 'Premium programme for high-achieving women',
    options: [
      {
        code: 'executive-womens-health',
        name: 'Executive Women\'s Health',
        price: '£950',
        desc: 'Premium programme for high achievers. Optimise performance while navigating hormonal transitions.',
        duration: 'MONTHLY',
        tag: 'MONTHLY PROGRAMME'
      }
    ]
  },
  
  // Aesthetic Treatments - Individual
  'anti-wrinkle-1': {
    title: 'Anti-Wrinkle Injections',
    subtitle: 'Botulinum Toxin Type A',
    options: [
      {
        code: 'anti-wrinkle-1-area',
        name: 'Anti-Wrinkle - 1 Area',
        price: '£295',
        desc: 'Precision muscle relaxation for one area (e.g., forehead, frown lines, or crow\'s feet). Natural results within 7 days.',
        duration: '30 MINS',
        tag: 'MOST BOOKED'
      }
    ]
  },
  'anti-wrinkle-3': {
    title: 'Anti-Wrinkle Injections',
    subtitle: 'Botulinum Toxin Type A - 3 Areas',
    options: [
      {
        code: 'anti-wrinkle-3-areas',
        name: 'Anti-Wrinkle - 3 Areas',
        price: '£595',
        desc: 'Complete upper face treatment covering forehead, frown lines, and crow\'s feet. Best value for comprehensive results.',
        duration: '45 MINS',
        tag: 'BEST VALUE'
      }
    ]
  },
  'salmon-dna': {
    title: 'Salmon DNA Therapy',
    subtitle: 'Polynucleotide Treatment',
    options: [
      {
        code: 'salmon-dna-treatment',
        name: 'Salmon DNA Therapy',
        price: '£550',
        desc: 'Marine DNA fragments trigger cellular renewal. Clinically proven 62% elasticity increase and deep hydration.',
        duration: '45 MINS',
        tag: 'INNOVATION'
      }
    ]
  },
  'profhilo': {
    title: 'Profhilo',
    subtitle: 'Bio-Remodelling Treatment',
    options: [
      {
        code: 'profhilo-treatment',
        name: 'Profhilo Session',
        price: '£495',
        desc: 'Pure hyaluronic acid bio-remodelling. Not a filler but a revolutionary skin quality treatment. Results peak at 8 weeks.',
        duration: '30 MINS',
        tag: 'SKIN QUALITY'
      }
    ]
  },
  'dermal-fillers-1ml': {
    title: 'Dermal Fillers',
    subtitle: 'Hyaluronic Acid Fillers',
    options: [
      {
        code: 'dermal-filler-1ml',
        name: 'Dermal Filler - 1ml',
        price: '£525',
        desc: 'Swiss hyaluronic acid for natural volume restoration. Perfect for lips, nasolabial folds, or marionette lines.',
        duration: '45 MINS',
        tag: 'VOLUME'
      }
    ]
  },
  'dermal-fillers-2ml': {
    title: 'Dermal Fillers',
    subtitle: 'Hyaluronic Acid Fillers - 2ml',
    options: [
      {
        code: 'dermal-filler-2ml',
        name: 'Dermal Filler - 2ml',
        price: '£950',
        desc: 'Comprehensive facial contouring with 2ml of premium filler. Ideal for cheeks, chin, and jawline definition.',
        duration: '60 MINS',
        tag: 'CONTOURING'
      }
    ]
  },
  'thread-lift-midface': {
    title: 'Thread Lift',
    subtitle: 'PDO Thread Lifting',
    options: [
      {
        code: 'thread-lift-mid',
        name: 'Thread Lift - Mid Face',
        price: '£850',
        desc: 'Non-surgical lifting with dissolvable PDO threads. Immediate lift with continued collagen synthesis for months.',
        duration: '60 MINS',
        tag: 'LIFTING'
      }
    ]
  },
  'thread-lift-full': {
    title: 'Thread Lift',
    subtitle: 'PDO Thread Lifting - Full Face',
    options: [
      {
        code: 'thread-lift-full',
        name: 'Thread Lift - Full Face',
        price: '£1,350',
        desc: 'Complete facial lifting and repositioning. Clinical studies show 2-3cm lift achieved. Results last 12-18 months.',
        duration: '90 MINS',
        tag: 'FULL LIFT'
      }
    ]
  },
  'chemical-peel': {
    title: 'Chemical Peels',
    subtitle: 'Medical-Grade Resurfacing',
    options: [
      {
        code: 'chemical-peel-single',
        name: 'Chemical Peel - Single',
        price: '£375',
        desc: 'Prescription-strength acids for skin renewal. 73% reduction in pigmentation clinically proven.',
        duration: '45 MINS',
        tag: 'RESURFACING'
      }
    ]
  },
  'chemical-peel-course': {
    title: 'Chemical Peels',
    subtitle: 'Course of 3 Treatments',
    options: [
      {
        code: 'chemical-peel-3x',
        name: 'Chemical Peel - Course of 3',
        price: '£950',
        desc: 'Complete resurfacing programme with 3 medical-grade peels. Optimal for acne scarring and pigmentation.',
        duration: '3 SESSIONS',
        tag: 'SAVE £175'
      }
    ]
  },
  
  // Aesthetic Packages
  'aesthetic-refresh': {
    title: 'The Refresh Package',
    subtitle: 'Perfect First Treatment',
    options: [
      {
        code: 'refresh-package',
        name: 'The Refresh',
        price: '£695',
        originalPrice: '£885',
        desc: 'Anti-wrinkle 3 areas, vitamin skin booster, medical consultation, 2-week review, and aftercare products.',
        duration: '60 MINS',
        tag: 'SAVE £190'
      }
    ]
  },
  'aesthetic-signature': {
    title: 'The Signature Package',
    subtitle: 'Complete Facial Rejuvenation',
    options: [
      {
        code: 'signature-package',
        name: 'The Signature',
        price: '£1,495',
        originalPrice: '£1,950',
        desc: 'Anti-wrinkle full face, Profhilo bio-remodelling, Salmon DNA therapy, facial assessment, 3 follow-ups, complete aftercare.',
        duration: 'MULTIPLE VISITS',
        tag: 'SAVE £455'
      }
    ]
  },
  'aesthetic-transform': {
    title: 'The Transform Package',
    subtitle: 'Ultimate Restoration',
    options: [
      {
        code: 'transform-package',
        name: 'The Transform',
        price: '£2,995',
        originalPrice: '£3,845',
        desc: 'Everything in Signature plus 2ml dermal filler, thread lift mid-face, 3 chemical peels, 6-month plan, VIP support.',
        duration: '6 MONTHS',
        tag: 'SAVE £850'
      }
    ]
  },
  
  // Gut Microbiome Testing
  'gut-core-microbiome': {
    title: 'Core Microbiome Test',
    subtitle: '16S rRNA Sequencing',
    options: [
      {
        code: 'gut-core-test',
        name: 'Core Microbiome Analysis',
        price: '£395',
        desc: 'Bacterial profiling at genus level. Diversity scores, dysbiosis index, comparison to healthy cohorts, and basic dietary recommendations.',
        duration: '10 DAYS',
        tag: 'ESSENTIAL'
      }
    ]
  },
  'gut-shotgun-metagenomics': {
    title: 'Shotgun Metagenomics',
    subtitle: 'Whole Genome Sequencing',
    options: [
      {
        code: 'gut-shotgun-test',
        name: 'Complete Microbiome Sequencing',
        price: '£695',
        desc: 'Research-grade analysis with species/strain identification, functional genes, metabolic pathways, SCFA potential. Includes raw FASTQ data and API access.',
        duration: '10 DAYS',
        tag: 'GOLD STANDARD'
      }
    ]
  },
  'gut-clinical-stool': {
    title: 'Clinical Stool Analysis',
    subtitle: 'GI-MAP Equivalent',
    options: [
      {
        code: 'gut-clinical-test',
        name: 'Comprehensive Stool Panel',
        price: '£595',
        desc: 'Calprotectin, elastase, parasites, H. pylori, pathogens, and short-chain fatty acids. Essential for IBS, IBD, and persistent symptoms.',
        duration: '10 DAYS',
        tag: 'CLINICAL'
      }
    ]
  },
  'gut-sibo-imo': {
    title: 'SIBO & IMO Test',
    subtitle: 'Breath Testing',
    options: [
      {
        code: 'gut-breath-test',
        name: 'SIBO/IMO Breath Test',
        price: '£295',
        desc: 'Gold-standard lactulose breath test. 3-hour collection for hydrogen and methane levels. Includes transit time assessment and treatment protocol.',
        duration: 'SAME DAY',
        tag: 'BREATH TEST'
      }
    ]
  },
  'gut-food-intolerance': {
    title: 'Food Intolerance Testing',
    subtitle: 'IgG & IgA Analysis',
    options: [
      {
        code: 'gut-food-test',
        name: 'Food Intolerance Panel',
        price: '£425',
        desc: '200+ foods tested for IgG and IgA antibodies. Severity scoring and rotation diet protocol included.',
        duration: '7 DAYS',
        tag: 'BLOOD TEST'
      }
    ]
  },
  'gut-complete-bundle': {
    title: 'Complete GI Bundle',
    subtitle: 'Everything Together',
    options: [
      {
        code: 'gut-complete-test',
        name: 'Complete GI Assessment',
        price: '£1,295',
        originalPrice: '£1,715',
        desc: 'Shotgun metagenomics + clinical markers + food intolerance. Priority processing, integrated report, 2 doctor consultations included.',
        duration: '7 DAYS',
        tag: 'SAVE £420'
      }
    ]
  },
  'gut-12week-protocol': {
    title: '12-Week Gut Transformation',
    subtitle: 'Test → Treat → Retest',
    options: [
      {
        code: 'gut-transformation',
        name: '12-Week Protocol',
        price: '£1,450',
        desc: 'Complete programme with baseline testing, personalised supplement protocol, 3 doctor consultations, and week 12 retest to track improvement.',
        duration: '12 WEEKS',
        tag: 'TRANSFORMATION'
      }
    ]
  },
  'gut-retest': {
    title: 'Retest Only',
    subtitle: 'Track Your Progress',
    options: [
      {
        code: 'gut-retest-only',
        name: 'Follow-Up Testing',
        price: '£495',
        desc: 'Same test as baseline with delta report showing changes. Protocol adjustments included. Volume discount for 3+ retests.',
        duration: '10 DAYS',
        tag: 'FOLLOW-UP'
      }
    ]
  },
  'hormone-therapy': {
    title: 'Hormone Therapy',
    subtitle: 'Restore balance and vitality',
    options: [
      {
        code: 'hormone-consultation',
        name: 'Initial Hormone Consultation',
        price: '£350',
        desc: 'Comprehensive hormone assessment including detailed blood work, symptom analysis, and personalised treatment plan development.',
        duration: '60 MINS',
        tag: 'ASSESSMENT'
      },
      {
        code: 'hormone-trt',
        name: 'Testosterone Replacement (TRT)',
        price: '£200/month',
        desc: 'Medical testosterone therapy with regular monitoring, dose adjustments, and ongoing support for optimal hormone balance.',
        duration: 'MONTHLY',
        tag: 'MEN\'S HEALTH'
      },
      {
        code: 'hormone-hrt',
        name: 'Bioidentical HRT',
        price: '£250/month',
        desc: 'Personalised bioidentical hormone replacement for menopause and andropause symptoms with regular monitoring.',
        duration: 'MONTHLY',
        tag: 'BIOIDENTICAL'
      },
      {
        code: 'hormone-thyroid',
        name: 'Thyroid Optimisation',
        price: '£180/month',
        desc: 'Comprehensive thyroid management including T3/T4 optimization, regular testing, and symptom management.',
        duration: 'MONTHLY',
        tag: 'THYROID'
      }
    ]
  },
  'adhd-autism': {
    title: 'ADHD & Autism Services',
    subtitle: 'Specialist assessment and support',
    options: [
      {
        code: 'adhd-assessment',
        name: 'ADHD Assessment',
        price: '£750',
        desc: 'Comprehensive ADHD assessment with specialist psychiatrist, including diagnostic evaluation and detailed report.',
        duration: '90 MINS',
        tag: 'DIAGNOSIS'
      },
      {
        code: 'autism-assessment',
        name: 'Autism Assessment',
        price: '£950',
        desc: 'Full autism spectrum assessment with multidisciplinary team evaluation and comprehensive diagnostic report.',
        duration: '2-3 HOURS',
        tag: 'COMPREHENSIVE'
      },
      {
        code: 'adhd-medication',
        name: 'ADHD Medication Management',
        price: '£185',
        desc: 'Ongoing medication management with titration, monitoring, and regular reviews with specialist psychiatrist.',
        duration: '30 MINS',
        tag: 'FOLLOW-UP'
      },
      {
        code: 'adhd-coaching',
        name: 'ADHD Coaching',
        price: '£150',
        desc: 'Practical strategies and support for managing ADHD symptoms in daily life, work, and relationships.',
        duration: '50 MINS',
        tag: 'SUPPORT'
      }
    ]
  },
  'wedding-programme': {
    title: 'Wedding Programme',
    subtitle: 'Look and feel your best',
    options: [
      {
        code: 'wedding-3month',
        name: '3-Month Transformation',
        price: '£2500',
        desc: 'Complete bridal wellness package including nutrition, fitness, treatments, and stress management for your special day.',
        duration: '3 MONTHS',
        tag: 'POPULAR'
      },
      {
        code: 'wedding-6month',
        name: '6-Month Premium',
        price: '£4500',
        desc: 'Extended transformation with medical weight management, skin treatments, hormone optimization, and wellness coaching.',
        duration: '6 MONTHS',
        tag: 'COMPREHENSIVE'
      },
      {
        code: 'wedding-couple',
        name: 'Couples Package',
        price: '£4000',
        desc: 'Joint transformation programme for bride and groom including all treatments, nutrition, and fitness plans.',
        duration: '3 MONTHS',
        tag: 'TOGETHER'
      },
      {
        code: 'wedding-express',
        name: 'Express Package',
        price: '£1500',
        desc: 'Intensive 6-week programme for last-minute preparation including treatments and nutrition support.',
        duration: '6 WEEKS',
        tag: 'FAST TRACK'
      }
    ]
  },
  'erectile-dysfunction': {
    title: 'Erectile Dysfunction',
    subtitle: 'Discreet, effective treatment',
    options: [
      {
        code: 'ed-consultation',
        name: 'ED Consultation',
        price: '£250',
        desc: 'Confidential consultation with specialist to identify causes and develop personalised treatment plan.',
        duration: '45 MINS',
        tag: 'PRIVATE'
      },
      {
        code: 'ed-shockwave',
        name: 'Shockwave Therapy',
        price: '£350',
        desc: 'Non-invasive treatment using acoustic waves to improve blood flow and restore natural function.',
        duration: '30 MINS',
        tag: 'NON-INVASIVE'
      },
      {
        code: 'ed-prp',
        name: 'P-Shot (PRP)',
        price: '£750',
        desc: 'Platelet-rich plasma injection for enhanced performance, sensitivity, and natural regeneration.',
        duration: '45 MINS',
        tag: 'REGENERATIVE'
      },
      {
        code: 'ed-package',
        name: 'Complete ED Package',
        price: '£2000',
        desc: '6 shockwave sessions plus P-Shot with comprehensive support and medication if needed.',
        duration: '6 SESSIONS',
        tag: 'BEST VALUE'
      }
    ]
  },
  'mental-health': {
    title: 'Mental Health',
    subtitle: 'Integrated mental wellness',
    options: [
      {
        code: 'mental-assessment',
        name: 'Mental Health Assessment',
        price: '£350',
        desc: 'Comprehensive psychiatric assessment with diagnosis, treatment recommendations, and care planning.',
        duration: '60 MINS',
        tag: 'ASSESSMENT'
      },
      {
        code: 'mental-therapy',
        name: 'Therapy Session',
        price: '£185',
        desc: 'Individual therapy with experienced psychologist for anxiety, depression, trauma, and life challenges.',
        duration: '50 MINS',
        tag: 'THERAPY'
      },
      {
        code: 'mental-psychiatry',
        name: 'Psychiatry Review',
        price: '£295',
        desc: 'Medication management and psychiatric review with consultant psychiatrist.',
        duration: '30 MINS',
        tag: 'MEDICATION'
      },
      {
        code: 'mental-intensive',
        name: 'Intensive Programme',
        price: '£1500/month',
        desc: 'Weekly therapy, fortnightly psychiatry, and 24/7 support for comprehensive mental health care.',
        duration: 'MONTHLY',
        tag: 'INTENSIVE'
      }
    ]
  },
  'fertility-ivf': {
    title: 'Fertility & IVF',
    subtitle: 'Comprehensive fertility support',
    options: [
      {
        code: 'fertility-assessment',
        name: 'Fertility Assessment',
        price: '£500',
        desc: 'Complete fertility evaluation including hormones, ultrasound, and personalised conception plan.',
        duration: '90 MINS',
        tag: 'ASSESSMENT'
      },
      {
        code: 'fertility-amh',
        name: 'AMH & Hormone Panel',
        price: '£350',
        desc: 'Comprehensive hormone testing including AMH, FSH, LH, and thyroid for fertility evaluation.',
        duration: '30 MINS',
        tag: 'TESTING'
      },
      {
        code: 'fertility-ivf-prep',
        name: 'IVF Preparation',
        price: '£750/month',
        desc: 'Optimisation programme including supplements, acupuncture, nutrition, and stress management.',
        duration: 'MONTHLY',
        tag: 'PREPARATION'
      },
      {
        code: 'fertility-male',
        name: 'Male Fertility Package',
        price: '£450',
        desc: 'Semen analysis, hormone testing, and lifestyle optimization for male fertility.',
        duration: '60 MINS',
        tag: 'MEN\'S FERTILITY'
      }
    ]
  },
  'prescription-refills': {
    title: 'Prescription Refills',
    subtitle: 'Fast, convenient medication management',
    options: [
      {
        code: 'prescription-auto-refill',
        name: 'Repeat Prescription Refills',
        price: '£35',
        desc: 'Auto-refill service with 3-6 month supplies. SMS reminders ensure you never miss a dose. Free next-day delivery included.',
        duration: 'AUTO-REFILL',
        tag: 'REFILL FEE'
      },
      {
        code: 'prescription-new',
        name: 'New Prescription Consultation',
        price: '£85',
        desc: '15-minute GMC-doctor video or phone consultation. All UK medications available with same-day prescription issue.',
        duration: '15 MINS',
        tag: 'CONSULTATION (INCLUDES PRESCRIPTION)'
      },
      {
        code: 'prescription-urgent',
        name: 'Emergency/Urgent Refill',
        price: '£110',
        desc: '2-hour turnaround for urgent needs. Weekend & holiday coverage, lost medication replacement, travel top-ups.',
        duration: '2 HOURS',
        tag: 'URGENT SERVICE'
      },
      {
        code: 'prescription-nhs-transfer',
        name: 'NHS Transfer',
        price: 'FREE',
        originalPrice: '£0',
        desc: 'Full NHS repeat-prescription takeover. We handle everything with your GP surgery. No transfer fee.',
        duration: 'FREE',
        tag: 'TRANSFER SERVICE'
      },
      {
        code: 'prescription-travel',
        name: 'Travel Medication Packs',
        price: '£75',
        desc: 'Up to 6-month supply for extended travel. Includes customs certificates and cold-chain delivery where needed.',
        duration: '6 MONTHS',
        tag: 'PLUS MEDICATION COST'
      },
      {
        code: 'prescription-premium',
        name: 'Premium Subscription Plan',
        price: '£50/month',
        desc: 'Up to 4 repeat refills per month, one 15-minute consultation included. Priority booking & 1-hour urgent service. Family add-ons available.',
        duration: 'PREMIUM',
        tag: 'MOST POPULAR'
      }
    ]
  },
  'executive-health': {
    title: 'Executive Health Assessments',
    subtitle: 'Preventive health checks for your future self. We measure biomarkers that actually predict risk, assess your cardiovascular and metabolic health, and create evidence-based action plans—delivered same day.',
    options: [
      {
        code: 'exec-pulse',
        name: 'Pulse',
        price: '£299',
        desc: 'Essential biomarkers that actually predict risk, private AI analysis of your health data, and a prioritised action plan. Results within 15 minutes.',
        duration: '30 MINS',
        tag: 'BASELINE'
      },
      {
        code: 'exec-gold',
        name: 'Gold',
        price: '£2,500',
        desc: 'Comprehensive whole-body MRI, extensive blood panel, microbiome mapping with AI-powered analysis and expert GP consultation with 3-month follow-up.',
        duration: 'FULL ASSESSMENT',
        tag: 'POPULAR'
      },
      {
        code: 'exec-continuum',
        name: 'Continuum',
        price: '£699',
        desc: 'Quarterly monitoring, targeted interventions, and medication when indicated—all managed to measurable targets. Includes complimentary Oura ring.',
        duration: 'MONTHLY',
        tag: 'BEST VALUE'
      },
      {
        code: 'exec-superhuman',
        name: 'Superhuman+',
        price: '£12,500',
        desc: 'Hospital-grade diagnostics, coordinated for efficiency, interpreted by specialists, transformed into your 90-day action plan—all delivered the same day.',
        duration: 'FULL DAY',
        tag: 'PREMIUM'
      }
    ]
  },
  'gut-microbiome': {
    title: 'Gut Microbiome',
    subtitle: 'Advanced gut health testing',
    options: [
      {
        code: 'gut-comprehensive',
        name: 'Comprehensive Gut Analysis',
        price: '£395',
        desc: 'Complete microbiome sequencing with bacterial diversity analysis, inflammation markers, digestive function, and personalised nutrition protocol.',
        duration: '45 MINS',
        tag: 'FULL ANALYSIS'
      },
      {
        code: 'gut-sibo',
        name: 'SIBO & Breath Testing',
        price: '£275',
        desc: 'Small intestinal bacterial overgrowth testing with hydrogen and methane breath analysis, plus targeted treatment recommendations.',
        duration: '2 HOURS',
        tag: 'SIBO TEST'
      },
      {
        code: 'gut-food',
        name: 'Food Sensitivity Panel',
        price: '£295',
        desc: 'Comprehensive food intolerance and sensitivity testing for 200+ foods with elimination diet plan and reintroduction protocol.',
        duration: '30 MINS',
        tag: 'FOOD TESTING'
      },
      {
        code: 'gut-programme',
        name: '12-Week Gut Reset',
        price: '£1200',
        desc: 'Complete gut restoration programme with initial testing, personalised supplements, nutrition plan, and two follow-up assessments.',
        duration: '12 WEEKS',
        tag: 'TRANSFORMATION'
      }
    ]
  },
  'sleep-clinic': {
    title: 'Sleep Clinic',
    subtitle: 'Comprehensive sleep assessment',
    options: [
      {
        code: 'sleep-assessment',
        name: 'Sleep Assessment',
        price: '£295',
        desc: 'Detailed sleep evaluation with overnight monitoring, sleep diary analysis, and personalised sleep optimization plan.',
        duration: '60 MINS',
        tag: 'ASSESSMENT'
      },
      {
        code: 'sleep-study',
        name: 'Home Sleep Study',
        price: '£450',
        desc: 'Comprehensive at-home polysomnography testing for sleep apnea, restless legs, and other sleep disorders with specialist interpretation.',
        duration: 'OVERNIGHT',
        tag: 'DIAGNOSTIC'
      },
      {
        code: 'sleep-insomnia',
        name: 'Insomnia Programme',
        price: '£750',
        desc: '6-week cognitive behavioral therapy for insomnia (CBT-I) with sleep restriction therapy and relaxation techniques.',
        duration: '6 WEEKS',
        tag: 'CBT-I'
      },
      {
        code: 'sleep-apnea',
        name: 'Sleep Apnea Treatment',
        price: '£1200',
        desc: 'Complete sleep apnea management including diagnosis, CPAP fitting if needed, and ongoing monitoring with specialist support.',
        duration: 'ONGOING',
        tag: 'TREATMENT'
      }
    ]
  },
  'long-covid': {
    title: 'Long COVID',
    subtitle: 'Specialist recovery programme',
    options: [
      {
        code: 'covid-assessment',
        name: 'Long COVID Assessment',
        price: '£450',
        desc: 'Comprehensive evaluation of persistent symptoms with specialist consultation, diagnostic tests, and personalised recovery plan.',
        duration: '90 MINS',
        tag: 'ASSESSMENT'
      },
      {
        code: 'covid-fatigue',
        name: 'Fatigue Management',
        price: '£350',
        desc: 'Targeted programme for post-viral fatigue including mitochondrial support, pacing strategies, and energy optimization protocols.',
        duration: '60 MINS',
        tag: 'FATIGUE'
      },
      {
        code: 'covid-respiratory',
        name: 'Respiratory Recovery',
        price: '£295',
        desc: 'Breathing rehabilitation with lung function testing, breathing exercises, and respiratory physiotherapy for improved oxygen utilization.',
        duration: '45 MINS',
        tag: 'BREATHING'
      },
      {
        code: 'covid-complete',
        name: 'Complete Recovery Programme',
        price: '£1800',
        desc: '12-week multidisciplinary recovery programme with medical support, rehabilitation therapy, nutrition, and psychological support.',
        duration: '12 WEEKS',
        tag: 'COMPREHENSIVE'
      }
    ]
  },
  'fit-to-fly': {
    title: 'Fit to Fly Certificates',
    subtitle: 'Medical travel documents',
    options: [
      {
        code: 'visa-medical-basic',
        name: 'Visa Medical - Certificate of Good Health (Basic)',
        price: '£70',
        desc: 'Same-day medical certificate of good health for visa applications. Accepted for Spain, Thailand, South Africa, South Korea, Barbados, Bermuda and worldwide.',
        duration: 'SAME DAY',
        tag: 'VISA'
      },
      {
        code: 'visa-medical-comprehensive',
        name: 'Visa Medical - Certificate of Good Health (Comprehensive)',
        price: '£80',
        desc: 'Comprehensive medical certificate with additional health screening for visa applications requiring detailed medical reports.',
        duration: 'SAME DAY',
        tag: 'VISA'
      },
      {
        code: 'pregnancy-fit-to-fly',
        name: 'Pregnancy Fit-to-Fly Certificate',
        price: '£50',
        desc: 'Medical certificate confirming both mother and baby are safe to travel. Required by airlines for pregnant passengers.',
        duration: 'SAME DAY',
        tag: 'PREGNANCY'
      },
      {
        code: 'chickenpox-recovery',
        name: 'Chickenpox Recovery Certificate',
        price: '£50',
        desc: 'Medical certificate proving scabbed-over chickenpox is no longer infectious. Required by airlines post-infection.',
        duration: 'SAME DAY',
        tag: 'MEDICAL'
      },
      {
        code: 'travel-cancellation',
        name: 'Travel Cancellation Certificate',
        price: '£50',
        desc: 'Medical certificate confirming illness preventing travel. Required for insurance claims and refund applications.',
        duration: 'SAME DAY',
        tag: 'CANCELLATION'
      },
      {
        code: 'france-work',
        name: 'France Work Medical Certificate',
        price: '£80',
        desc: 'OFII-compliant medical certificate required for working in France. Includes fitness to work assessment.',
        duration: 'SAME DAY',
        tag: 'WORK VISA'
      },
      {
        code: 'spain-visa',
        name: 'Spain Visa Medical Certificate',
        price: '£70',
        desc: 'Medical certificate for non-lucrative or student visa applications to Spain. Meets Spanish consulate requirements.',
        duration: 'SAME DAY',
        tag: 'SPAIN'
      },
      {
        code: 'greece-visa',
        name: 'Greece Work & Long Stay Visa Certificate',
        price: '£80',
        desc: 'Medical certificate for Greek work permits and long-stay visas. Compliant with Greek immigration requirements.',
        duration: 'SAME DAY',
        tag: 'GREECE'
      },
      {
        code: 'vaccine-exemption',
        name: 'Vaccine Exemption Certificate',
        price: '£50',
        desc: 'International vaccine exemption certificate confirming medical contraindication to specific vaccines.',
        duration: 'SAME DAY',
        tag: 'EXEMPTION'
      },
      {
        code: 'travel-medication',
        name: 'Travel with Medication Letter',
        price: '£50',
        desc: 'Official letter confirming prescribed medications for international travel. Includes medication list and medical necessity.',
        duration: 'SAME DAY',
        tag: 'MEDICATION'
      },
      {
        code: 'covid-verification',
        name: 'COVID-19 Test Verification',
        price: '£8',
        originalPrice: '£10',
        desc: 'Verification service for COVID-19 rapid lateral flow test results. Digital certificate provided.',
        duration: 'SAME DAY',
        tag: 'COVID'
      },
      {
        code: 'yellow-fever-exemption',
        name: 'Yellow Fever Vaccine Exemption',
        price: '£50',
        desc: 'International certificate exempting from yellow fever vaccination due to medical contraindication.',
        duration: 'SAME DAY',
        tag: 'YELLOW FEVER'
      },
      {
        code: 'fit-to-cruise',
        name: 'Fit-to-Cruise Medical Certificate',
        price: '£50',
        desc: 'Medical fitness certificate required by cruise lines confirming ability to travel by ship.',
        duration: 'SAME DAY',
        tag: 'CRUISE'
      },
      {
        code: 'medical-exemption',
        name: 'Medical Exemption Certificate',
        price: '£50',
        desc: 'General medical exemption certificate for activities limited by health conditions.',
        duration: 'SAME DAY',
        tag: 'EXEMPTION'
      },
      {
        code: 'allergy-certificate',
        name: 'Allergy Certificate',
        price: '£50',
        desc: 'Medical certificate confirming allergies and required emergency medications for travel.',
        duration: 'SAME DAY',
        tag: 'ALLERGY'
      },
      {
        code: 'expedition-cruise',
        name: 'Expedition Cruise Medical',
        price: '£75',
        desc: 'Enhanced medical certificate for remote expedition cruises requiring additional health clearance.',
        duration: 'SAME DAY',
        tag: 'EXPEDITION'
      }
    ]
  },
  'driver-medicals': {
    title: 'Driver Medical Assessments',
    subtitle: 'DVLA-approved medical examinations',
    options: [
      {
        code: 'hgv-d4',
        name: 'HGV D4 Medical',
        price: '£95',
        desc: 'Complete DVLA D4 medical examination for HGV/LGV drivers. Required for initial application and renewal of Category C and C+E licenses.',
        duration: '30 MINS',
        tag: 'GROUP 2'
      },
      {
        code: 'taxi-medical',
        name: 'Taxi Medical',
        price: '£105',
        desc: 'Medical assessment for taxi and private hire drivers. Accepted by TfL and all UK local authorities for new applications and renewals.',
        duration: '30 MINS',
        tag: 'TFL APPROVED'
      },
      {
        code: 'wolverhampton-taxi',
        name: 'Wolverhampton Taxi Medical',
        price: '£110',
        desc: 'Specific medical examination meeting Wolverhampton City Council requirements for hackney carriage and private hire drivers.',
        duration: '30 MINS',
        tag: 'WOLVERHAMPTON'
      },
      {
        code: 'pcv-bus',
        name: 'PCV Bus Medical',
        price: '£95',
        desc: 'DVLA D4 medical for bus and coach drivers. Required for Category D and D+E licenses for passenger carrying vehicles.',
        duration: '30 MINS',
        tag: 'BUS DRIVER'
      },
      {
        code: 'c1-medical',
        name: 'C1 Medical',
        price: '£95',
        desc: 'Medical examination for C1 license holders driving vehicles between 3.5 and 7.5 tonnes. Required at 70 and every 3 years after.',
        duration: '30 MINS',
        tag: 'MEDIUM GOODS'
      },
      {
        code: 'paramedic-c1',
        name: 'Paramedic C1 Medical',
        price: '£105',
        desc: 'Specialized C1 medical assessment for paramedics and ambulance drivers meeting NHS and private ambulance service requirements.',
        duration: '30 MINS',
        tag: 'EMERGENCY'
      },
      {
        code: 'motorhome-d1',
        name: 'Motorhome D1 Medical',
        price: '£95',
        desc: 'Medical assessment for motorhome and campervan drivers. Required for vehicles over 3.5 tonnes or minibus conversions.',
        duration: '30 MINS',
        tag: 'RECREATIONAL'
      },
      {
        code: 'section-88',
        name: 'Section 88 Letter',
        price: '£75',
        desc: 'Medical support letter for Section 88 applications allowing you to continue driving while DVLA processes your medical license renewal.',
        duration: '15 MINS',
        tag: 'SUPPORT'
      }
    ]
  }
}