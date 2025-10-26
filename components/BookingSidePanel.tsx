'use client'

import { useState, useEffect } from 'react'
import { servicesData } from '@/data/servicesData'
import { BookingData } from '@/types/services'
import StripePaymentWithDiscount from './StripePaymentWithDiscount'
import GLP1HealthQuestionnaire from './GLP1HealthQuestionnaire'
import AvailabilitySelector from './AvailabilitySelector'
import { bookingAPI, AvailabilitySlot, ServiceLocation, mapServiceToAPIService, mapGenderToAPI } from '@/lib/booking-api'
import { orderAPI, mapBookingToPatientInfo } from '@/lib/order-api'
import { captureAbandonedBooking, updateAbandonedBookingWithPaymentIntent } from '@/lib/abandonedBookings'

interface BookingSidePanelProps {
  isOpen: boolean
  onClose: () => void
  service: string | null
  initialData?: Partial<BookingData>
  customPackage?: {
    id: string
    title: string
    price: number
    description?: string
    features?: string[]
  }
}

function BookingSidePanel({ isOpen, onClose, service, initialData, customPackage }: BookingSidePanelProps) {
  const [currentStep, setCurrentStep] = useState('subServices')
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    treatment: null,
    treatmentName: null,
    price: null,
    duration: null,
    personal: initialData?.personal || {},
    health: initialData?.health || {},
    appointment: initialData?.appointment || {},
    payment: {},
    photos: {}
  })
  
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<ServiceLocation | null>(null)
  const [holdId, setHoldId] = useState<string | null>(null)
  const [abandonedBookingId, setAbandonedBookingId] = useState<string | null>(null)
  const [discountInfo, setDiscountInfo] = useState<{
    code: string | null;
    percentOff?: number | null;
    amountOff?: number | null;
    finalAmount: number;
  } | null>(null)

  const serviceData = service ? servicesData[service] : null

  // Handle when service prop changes (e.g., from URL params)
  useEffect(() => {
    if (customPackage && isOpen) {
      // Handle custom package booking
      setBookingData(prev => ({
        ...prev,
        service: 'custom-package',
        treatment: customPackage.id,
        treatmentName: customPackage.title,
        price: customPackage.price,
        duration: null,
        isCustomPackage: true,
        customPackageData: customPackage
      }))
      // Skip directly to personal details for custom packages
      setCurrentStep('personalDetails')
    } else if (service && isOpen) {
      // Check if this is a specific treatment code
      const isSpecificTreatment = service.includes('-')

      if (isSpecificTreatment) {
        // Find which service this treatment belongs to
        let foundService = null
        let foundTreatment = null

        for (const [serviceKey, serviceInfo] of Object.entries(servicesData)) {
          const treatment = serviceInfo.options.find(opt => opt.code === service)
          if (treatment) {
            foundService = serviceKey
            foundTreatment = treatment
            break
          }
        }

        if (foundService && foundTreatment) {
          // Set the booking data with the found treatment
          setBookingData(prev => ({
            ...prev,
            service: foundService,
            treatment: service,
            treatmentName: foundTreatment.name,
            price: foundTreatment.price,
            duration: foundTreatment.duration
          }))
          // Skip to personal details since treatment is already selected
          setCurrentStep('personalDetails')
        }
      } else {
        // Just a service category, show sub-services
        setBookingData(prev => ({
          ...prev,
          service: service
        }))
        setCurrentStep('subServices')
      }
    }
  }, [service, isOpen, customPackage])

  const proceedToBooking = (treatment: string) => {
    if (!serviceData) return
    
    const treatmentData = serviceData.options.find(opt => opt.code === treatment)
    if (!treatmentData) return

    setBookingData({
      ...bookingData,
      service,
      treatment,
      treatmentName: treatmentData.name,
      price: treatmentData.price,
      duration: treatmentData.duration
    })

    setCurrentStep('personalDetails')
  }

  const handleClose = () => {
    setCurrentStep('subServices')
    setBookingData({
      service: null,
      treatment: null,
      treatmentName: null,
      price: null,
      duration: null,
      personal: {},
      health: {},
      appointment: {},
      payment: {},
      photos: {}
    })
    setSelectedSlot(null)
    setSelectedLocation(null)
    setHoldId(null)
    onClose()
  }

  const handleSlotSelect = async (slot: AvailabilitySlot, location: ServiceLocation) => {
    try {
      let holdId: string | null = null;
      
      // TODO: Re-enable slot holding when Randox API credentials are provided
      // Commented out until API access is available
      /*
      if (!slot.id.startsWith('mock-')) {
        try {
          const holdResponse = await bookingAPI.holdAvailability({
            availabilityId: slot.id,
            holdDurationMinutes: 15 // Hold for 15 minutes
          })
          holdId = holdResponse.holdId;
        } catch (error) {
          console.warn('Failed to hold slot, proceeding without hold:', error);
        }
      }
      */
      
      setSelectedSlot(slot)
      setSelectedLocation(location)
      setHoldId(holdId)
      
      // Update booking data with slot info
      setBookingData({
        ...bookingData,
        appointment: {
          appointmentDate: slot.date,
          appointmentTime: slot.time,
          location: location.name,
          locationId: location.id,
          slotId: slot.id,
          holdId: holdId
        }
      })
      
      setCurrentStep(bookingData.price === 'FREE' || bookingData.price === 0 ? 'confirmation' : 'payment')
    } catch (error) {
      console.error('Error processing slot selection:', error)
      alert('Failed to select time slot. Please try again.')
    }
  }

  const createBloodTestOrder = async (bookingData: any, userId: string) => {
    // Check if this booking includes blood tests
    const isBloodTest = bookingData.service === 'blood-tests' || 
                       bookingData.treatment?.includes('blood') ||
                       bookingData.treatment?.includes('panel');
    
    if (!isBloodTest) {
      return null; // Not a blood test booking
    }

    try {
      // Map booking data to patient info for order creation
      const patientInfo = mapBookingToPatientInfo(bookingData, userId);
      
      // Get available test items to map the treatment
      const testItems = await orderAPI.getTestItems();
      const testReasons = await orderAPI.getTestReasons();
      
      // Map treatment to test IDs (you may need to customize this mapping)
      const treatmentToTestMapping: Record<string, string[]> = {
        'basic-panel': ['CBC', 'GLUCOSE', 'LIPID'],
        'comprehensive': ['CBC', 'CMP', 'LIPID', 'TSH'],
        'wellness-check': ['CBC', 'CMP', 'VITAMIN_D']
      };
      
      const testIds = treatmentToTestMapping[bookingData.treatment] || ['CBC'];
      const availableTestIds = testItems
        .filter(test => testIds.includes(test.id))
        .map(test => test.id);
      
      // Create order request
      const orderRequest = {
        patientInfo,
        testItems: availableTestIds,
        testReasons: [testReasons[0]?.id || 'ROUTINE'], // Default to routine
        clinicDetails: {
          clinicId: selectedLocation?.id || 'TWB-CLINIC-001',
          requestingPhysician: 'The Wellness Team'
        },
        urgency: 'routine' as const,
        notes: `Ordered via booking system. Health info: ${JSON.stringify(bookingData.health)}`
      };

      // Create the order
      const orderResponse = await orderAPI.createOrder(orderRequest);
      return orderResponse.orderId;
      
    } catch (error) {
      console.warn('Failed to create blood test order:', error);
      // Don't fail the booking if order creation fails
      return null;
    }
  };

  const createBookingWithAPI = async (paymentIntentId?: string) => {
    // Some services (like weight management programmes and free consultations) don't require appointments
    const requiresAppointment = !(
      bookingData.treatment === 'glp1-weight' ||
      bookingData.treatment === 'complete-weight' ||
      bookingData.treatment === 'basic-weight' ||
      bookingData.treatment === 'weight-consultation' ||
      bookingData.treatment === 'consultation' ||
      (bookingData as any).isCustomPackage
    )

    if (requiresAppointment && (!selectedSlot || !selectedLocation)) {
      throw new Error('No appointment slot selected')
    }

    try {
      let externalBookingId: string | null = null;
      let externalReferenceNumber: string | null = null;
      let orderId: string | null = null;
      
      // TODO: Re-enable external booking creation when Randox API credentials are provided
      // Commented out until API access is available
      /*
      if (!selectedSlot.id.startsWith('mock-') && !selectedLocation.id.startsWith('mock-')) {
        try {
          const serviceId = mapServiceToAPIService(bookingData.service!, bookingData.treatment!)
          
          const apiBookingRequest = {
            serviceId,
            locationId: selectedLocation.id,
            availabilityId: selectedSlot.id,
            patientDetails: {
              firstName: bookingData.personal.fullName?.split(' ')[0] || '',
              lastName: bookingData.personal.fullName?.split(' ').slice(1).join(' ') || '',
              email: bookingData.personal.email || '',
              phone: bookingData.personal.phone || '',
              dateOfBirth: bookingData.personal.dob || '',
              gender: mapGenderToAPI(bookingData.personal.gender || ''),
              address: {
                line1: bookingData.personal.addressLine1 || '',
                line2: bookingData.personal.addressLine2,
                city: bookingData.personal.city || '',
                postalCode: bookingData.personal.postalCode || '',
                country: bookingData.personal.country || 'UK'
              }
            },
            notes: `Health info: ${JSON.stringify(bookingData.health)}`
          }

          const apiBookingResponse = await bookingAPI.createBooking(apiBookingRequest)
          externalBookingId = apiBookingResponse.id;
          externalReferenceNumber = apiBookingResponse.referenceNumber;
        } catch (apiError) {
          console.warn('Failed to create external booking, proceeding with internal booking only:', apiError);
          // Generate a fallback reference number
          externalReferenceNumber = `TWB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        }
      } else {
        // Generate a fallback reference number for mock bookings
        externalReferenceNumber = `TWB-DEMO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      }
      */
      
      // Always use internal reference numbers until API is available
      externalReferenceNumber = `TWB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Store booking data and create internal record
      const combinedBookingData = {
        ...bookingData,
        externalBookingId,
        externalReferenceNumber,
        paymentIntentId
      }

      // Create internal booking record
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          bookingData: combinedBookingData,
          paymentIntentId 
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create internal booking record')
      }

      const result = await response.json()
      
      // Try to create blood test order if this is a blood test booking
      try {
        orderId = await createBloodTestOrder(combinedBookingData, result.userId || result.booking?.userId);
        if (orderId) {
          console.log('Blood test order created:', orderId);
          // You could update the booking record with the order ID here if needed
        }
      } catch (orderError) {
        console.warn('Failed to create blood test order:', orderError);
        // Don't fail the booking if order creation fails
      }
      
      if (result.isNewUser) {
        alert('Booking confirmed! Check your email to set up your account password.')
      }

      // Send Slack notification for confirmed booking (don't fail if this fails)
      try {
        await fetch('/api/slack/booking-confirmed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: bookingData.personal.email,
            fullName: bookingData.personal.fullName,
            phone: bookingData.personal.phone,
            service: bookingData.service,
            treatmentName: bookingData.treatmentName,
            price: bookingData.price,
            appointmentDate: selectedSlot?.date,
            appointmentTime: selectedSlot?.time,
            location: selectedLocation?.name,
            referenceNumber: externalReferenceNumber
          })
        })
      } catch (slackError) {
        console.error('Failed to send Slack confirmation notification:', slackError)
        // Continue anyway - the booking was created
      }

      return result
    } catch (error) {
      console.error('Error creating booking:', error)
      throw error
    }
  }

  const getProgressWidth = () => {
    // Weight management programmes have photo upload step
    const isWeightProgramme = bookingData.treatment === 'glp1-weight' ||
                              bookingData.treatment === 'complete-weight' ||
                              bookingData.treatment === 'basic-weight'

    const isWeightConsultation = bookingData.treatment === 'weight-consultation'

    // Free consultations skip date/time selection
    const isFreeConsultation = bookingData.treatment === 'consultation'

    if (isWeightProgramme) {
      const steps: Record<string, number> = {
        'subServices': 0,
        'personalDetails': 25,
        'healthQuestions': 50,
        'photoUpload': 75,
        'payment': 90,
        'confirmation': 100
      }
      return steps[currentStep] || 0
    }

    if (isWeightConsultation || isFreeConsultation) {
      const steps: Record<string, number> = {
        'subServices': 0,
        'personalDetails': 33,
        'healthQuestions': 66,
        'payment': 90,
        'confirmation': 100
      }
      return steps[currentStep] || 0
    }

    const steps: Record<string, number> = {
      'subServices': 0,
      'personalDetails': 25,
      'healthQuestions': 50,
      'dateTimeSelection': 75,
      'payment': 90,
      'confirmation': 100
    }
    return steps[currentStep] || 0
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className={`overlay ${isOpen ? 'active' : ''}`} 
        onClick={handleClose}
      />

      {/* Side Panel */}
      <div className={`side-panel ${isOpen ? 'active' : ''}`}>
        {/* Progress Bar */}
        <div className="booking-progress-bar">
          <div 
            className="booking-progress-fill" 
            style={{ width: `${getProgressWidth()}%` }}
          />
        </div>
        
        <div className="panel-header">
          <h2 className="panel-title">
            {currentStep === 'subServices' && serviceData ? serviceData.title : bookingData.treatmentName || 'Select Treatment'}
          </h2>
          <p className="panel-subtitle">
            {currentStep === 'subServices' && serviceData ? serviceData.subtitle : 'Complete your booking'}
          </p>
          <button className="close-panel" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor"/>
            </svg>
          </button>
        </div>
        
        {/* Sub-services Selection */}
        {currentStep === 'subServices' && (
          <div className="panel-content">
            {serviceData?.options.map((option, index) => (
              <div key={option.code} className="sub-service-card">
                <div className="sub-service-image">
                  <span className="sub-service-tag">{option.tag}</span>
                </div>
                <div className="sub-service-info">
                  <h3 className="sub-service-name">{option.name}</h3>
                  <p className="sub-service-desc">{option.desc}</p>
                  <div className="sub-service-footer">
                    <span className="sub-service-price">
                      {option.originalPrice && (
                        <span className="original-price">{option.originalPrice}</span>
                      )}
                      {option.price}
                    </span>
                    <span className="sub-service-duration">{option.duration}</span>
                  </div>
                  <button 
                    className="sub-service-book" 
                    onClick={() => proceedToBooking(option.code)}
                  >
                    BOOK {option.name.toUpperCase()}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking Flow Pages */}
        <div className="booking-container" style={{ display: currentStep !== 'subServices' ? 'block' : 'none' }}>
          {/* Personal Details */}
          {currentStep === 'personalDetails' && (
            <div className="booking-page">
              <button
                className="previous-button"
                onClick={(e) => {
                  // Capture current form values before going back
                  const form = (e.currentTarget as HTMLButtonElement).closest('.booking-page')?.querySelector('form') as HTMLFormElement
                  if (form) {
                    const formData = new FormData(form)
                    const personalData: Record<string, any> = {}
                    formData.forEach((value, key) => {
                      personalData[key] = value
                    })
                    // Save the partial form data
                    setBookingData(prev => ({ ...prev, personal: { ...prev.personal, ...personalData } }))
                  }
                  setCurrentStep('subServices')
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Previous
              </button>
              <div className="booking-header">
                <h2 className="booking-title">Your Details</h2>
                <p className="booking-subtitle">We need some information to personalise your treatment and ensure it's safe for you. Your address is required for service delivery and medical records.</p>
              </div>
              
              <form className="booking-form" onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const personalData: Record<string, any> = {}
                formData.forEach((value, key) => {
                  personalData[key] = value
                })
                setBookingData({ ...bookingData, personal: personalData })
                
                // Capture abandoned booking early (when they submit personal details)
                if (personalData.email && !abandonedBookingId) {
                  try {
                    const booking = await captureAbandonedBooking({
                      email: personalData.email,
                      bookingType: bookingData.service || service || 'unknown',
                      customerDetails: {
                        name: personalData.fullName || '',
                        phone: personalData.phone || ''
                      },
                      metadata: {
                        treatment: bookingData.treatment,
                        treatmentName: bookingData.treatmentName
                      }
                    })
                    if (booking.id) {
                      setAbandonedBookingId(booking.id)
                      console.log('Captured early abandoned booking:', booking.id)
                    }
                  } catch (error) {
                    console.error('Failed to capture abandoned booking:', error)
                    // Don't block the user flow if this fails
                  }
                }

                // Send Slack notification when personal details are submitted
                if (personalData.email) {
                  try {
                    await fetch('/api/slack/booking-started', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        email: personalData.email,
                        fullName: personalData.fullName || '',
                        phone: personalData.phone,
                        service: bookingData.service || service,
                        treatmentName: bookingData.treatmentName
                      })
                    })
                    console.log('Slack notification sent for booking started')
                  } catch (error) {
                    console.error('Failed to send Slack notification:', error)
                    // Don't block the user flow if this fails
                  }
                }
                
                // For custom packages, skip to payment after personal details
                if ((bookingData as any).isCustomPackage) {
                  setCurrentStep('payment')
                } else {
                  setCurrentStep('healthQuestions')
                }
              }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input type="text" className="form-input" name="fullName" defaultValue={bookingData.personal.fullName || ''} required />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" className="form-input" name="email" defaultValue={bookingData.personal.email || ''} required />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input type="tel" className="form-input" name="phone" placeholder="+44" defaultValue={bookingData.personal.phone || ''} required />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Date of Birth *</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="number"
                      className="form-input"
                      name="dobDay"
                      placeholder="DD"
                      min="1"
                      max="31"
                      defaultValue={bookingData.personal.dob ? new Date(bookingData.personal.dob).getDate() : ''}
                      required
                      style={{ flex: '1' }}
                      onChange={(e) => {
                        const day = e.target.value
                        const monthInput = e.target.parentElement?.querySelector('[name="dobMonth"]') as HTMLInputElement
                        const yearInput = e.target.parentElement?.querySelector('[name="dobYear"]') as HTMLInputElement
                        const dobInput = e.target.parentElement?.parentElement?.querySelector('[name="dob"]') as HTMLInputElement
                        if (day && monthInput?.value && yearInput?.value && dobInput) {
                          dobInput.value = `${yearInput.value}-${monthInput.value.padStart(2, '0')}-${day.padStart(2, '0')}`
                        }
                      }}
                    />
                    <input
                      type="number"
                      className="form-input"
                      name="dobMonth"
                      placeholder="MM"
                      min="1"
                      max="12"
                      defaultValue={bookingData.personal.dob ? new Date(bookingData.personal.dob).getMonth() + 1 : ''}
                      required
                      style={{ flex: '1' }}
                      onChange={(e) => {
                        const month = e.target.value
                        const dayInput = e.target.parentElement?.querySelector('[name="dobDay"]') as HTMLInputElement
                        const yearInput = e.target.parentElement?.querySelector('[name="dobYear"]') as HTMLInputElement
                        const dobInput = e.target.parentElement?.parentElement?.querySelector('[name="dob"]') as HTMLInputElement
                        if (dayInput?.value && month && yearInput?.value && dobInput) {
                          dobInput.value = `${yearInput.value}-${month.padStart(2, '0')}-${dayInput.value.padStart(2, '0')}`
                        }
                      }}
                    />
                    <input
                      type="number"
                      className="form-input"
                      name="dobYear"
                      placeholder="YYYY"
                      min="1900"
                      max={new Date().getFullYear()}
                      defaultValue={bookingData.personal.dob ? new Date(bookingData.personal.dob).getFullYear() : ''}
                      required
                      style={{ flex: '2' }}
                      onChange={(e) => {
                        const year = e.target.value
                        const dayInput = e.target.parentElement?.querySelector('[name="dobDay"]') as HTMLInputElement
                        const monthInput = e.target.parentElement?.querySelector('[name="dobMonth"]') as HTMLInputElement
                        const dobInput = e.target.parentElement?.parentElement?.querySelector('[name="dob"]') as HTMLInputElement
                        if (dayInput?.value && monthInput?.value && year && dobInput) {
                          dobInput.value = `${year}-${monthInput.value.padStart(2, '0')}-${dayInput.value.padStart(2, '0')}`
                        }
                      }}
                    />
                  </div>
                  <input type="hidden" name="dob" defaultValue={bookingData.personal.dob || ''} required />
                  <span className="form-helper-text">You must be 18 or older to book treatments</span>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <select className="form-select" name="gender" defaultValue={bookingData.personal.gender || ''} required>
                    <option value="">Select...</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Address Line 1 *</label>
                  <input type="text" className="form-input" name="addressLine1" placeholder="House number and street name" defaultValue={bookingData.personal.addressLine1 || ''} required />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Address Line 2</label>
                  <input type="text" className="form-input" name="addressLine2" placeholder="Apartment, suite, etc. (optional)" defaultValue={bookingData.personal.addressLine2 || ''} />
                </div>
                
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input type="text" className="form-input" name="city" defaultValue={bookingData.personal.city || ''} required />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Postal Code *</label>
                  <input type="text" className="form-input" name="postalCode" placeholder="e.g. SW1A 1AA" defaultValue={bookingData.personal.postalCode || ''} required />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Country *</label>
                  <select className="form-select" name="country" defaultValue={bookingData.personal.country || ''} required>
                    <option value="">Select...</option>
                    <option value="uk">United Kingdom</option>
                    <option value="ireland">Ireland</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="checkbox-group">
                  <input type="checkbox" className="checkbox-input" id="marketing" name="marketing" defaultChecked={bookingData.personal.marketing === 'true'} />
                  <label htmlFor="marketing" className="checkbox-label">
                    I'd like to receive exclusive offers, wellness tips, and updates from The Wellness
                  </label>
                </div>
                
                <div className="checkbox-group">
                  <input type="checkbox" className="checkbox-input" id="terms" name="terms" required />
                  <label htmlFor="terms" className="checkbox-label">
                    I agree to the Terms & Conditions and Privacy Policy *
                  </label>
                </div>
                
                <button type="submit" className="booking-button">CONTINUE TO HEALTH QUESTIONS</button>
              </form>
            </div>
          )}

          {/* Health Questions - GLP-1 or standard */}
          {currentStep === 'healthQuestions' && (
            bookingData.treatment === 'glp1-weight' || bookingData.treatment === 'complete-weight' || bookingData.treatment === 'basic-weight' ? (
              <GLP1HealthQuestionnaire
                onComplete={(healthData) => {
                  setBookingData({ ...bookingData, health: healthData })
                  // Weight management programmes go to photo upload
                  setCurrentStep('photoUpload')
                }}
                onPrevious={() => setCurrentStep('personalDetails')}
              />
            ) : (
              <div className="booking-page">
                <button
                  className="previous-button"
                  onClick={(e) => {
                    // Capture current form values before going back
                    const form = (e.currentTarget as HTMLButtonElement).closest('.booking-page')?.querySelector('form') as HTMLFormElement
                    if (form) {
                      const formData = new FormData(form)
                      const healthData: Record<string, any> = {}
                      formData.forEach((value, key) => {
                        healthData[key] = value
                      })
                      // Save the partial form data
                      setBookingData(prev => ({ ...prev, health: { ...prev.health, ...healthData } }))
                    }
                    setCurrentStep('personalDetails')
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                  </svg>
                  Previous
                </button>
                <h2 className="booking-title">Health Questions</h2>
                <p className="booking-subtitle">Please answer these questions to ensure your treatment is safe and suitable for you.</p>
                
                <form className="booking-form" onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const healthData: Record<string, any> = {}
                  formData.forEach((value, key) => {
                    healthData[key] = value
                  })
                  setBookingData({ ...bookingData, health: healthData })
                  // For custom packages, weight consultation, and free consultations, skip to payment after health questions
                  if ((bookingData as any).isCustomPackage ||
                      bookingData.treatment === 'weight-consultation' ||
                      bookingData.treatment === 'consultation') {
                    setCurrentStep('payment')
                  } else {
                    setCurrentStep('dateTimeSelection')
                  }
                }}>
                  <div className="form-group">
                    <label className="form-label">Do you have any allergies? *</label>
                    <textarea className="form-textarea" name="allergies" rows={3} placeholder="Please list any allergies..." defaultValue={bookingData.health.allergies || ''} />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Are you currently taking any medications? *</label>
                    <textarea className="form-textarea" name="medications" rows={3} placeholder="Please list any medications..." defaultValue={bookingData.health.medications || ''} />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Do you have any medical conditions we should be aware of? *</label>
                    <textarea className="form-textarea" name="conditions" rows={3} placeholder="Please describe any medical conditions..." defaultValue={bookingData.health.conditions || ''} />
                  </div>
                  
                  <button type="submit" className="booking-button">CONTINUE TO DATE & TIME</button>
                </form>
              </div>
            )
          )}

          {/* Photo Upload for Weight Management Programmes */}
          {currentStep === 'photoUpload' && (
            <div className="booking-page">
              <button
                className="previous-button"
                onClick={() => setCurrentStep('healthQuestions')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Previous
              </button>
              <div className="booking-header">
                <h2 className="booking-title">Upload Progress Photos</h2>
                <p className="booking-subtitle">Help us track your transformation journey with before photos.</p>
              </div>

              <form className="booking-form" onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const photoData: Record<string, any> = {}
                formData.forEach((value, key) => {
                  photoData[key] = value
                })
                setBookingData({ ...bookingData, photos: photoData })
                setCurrentStep('payment')
              }}>
                <div className="photo-upload-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>Secure & Encrypted</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
                        Your photos are encrypted with 256-bit AES encryption and stored securely. Only your dedicated medical team can access them.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Front View Photo *</label>
                  <p className="form-helper-text" style={{ marginBottom: '8px' }}>Stand facing the camera in fitted clothing</p>
                  <input
                    type="file"
                    className="form-input"
                    name="frontPhoto"
                    accept="image/*"
                    required
                    style={{ padding: '12px' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Side View Photo *</label>
                  <p className="form-helper-text" style={{ marginBottom: '8px' }}>Stand sideways to the camera in fitted clothing</p>
                  <input
                    type="file"
                    className="form-input"
                    name="sidePhoto"
                    accept="image/*"
                    required
                    style={{ padding: '12px' }}
                  />
                </div>

                <div className="form-group" style={{ marginTop: '24px' }}>
                  <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                      <strong style={{ color: '#1a1a1a' }}>Privacy Note:</strong> Your photos will only be used to monitor your progress and optimize your treatment plan. They will never be shared publicly or used for marketing purposes without your explicit consent.
                    </p>
                  </div>
                </div>

                <button type="submit" className="booking-button">CONTINUE TO PAYMENT</button>
              </form>
            </div>
          )}

          {currentStep === 'dateTimeSelection' && bookingData.service && bookingData.treatment && (
            <>
              {/* Check if this is a wedding programme */}
              {bookingData.service?.startsWith('wedding-') ? (
                <div className="booking-page">
                  <button
                    className="previous-button"
                    onClick={(e) => {
                      // Capture current form values before going back
                      const form = (e.currentTarget as HTMLButtonElement).closest('.booking-page')?.querySelector('form') as HTMLFormElement
                      if (form) {
                        const formData = new FormData(form)
                        const weddingDate = formData.get('weddingDate') as string
                        if (weddingDate) {
                          setBookingData(prev => ({
                            ...prev,
                            appointment: { ...prev.appointment, appointmentDate: weddingDate }
                          }))
                        }
                      }
                      setCurrentStep('healthQuestions')
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 5l-7 7 7 7"/>
                    </svg>
                    Previous
                  </button>
                  
                  <h2 className="form-title">When is your wedding?</h2>
                  <p className="form-subtitle">We'll create your transformation timeline based on your wedding date</p>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const weddingDate = formData.get('weddingDate') as string
                    
                    if (weddingDate) {
                      // Create a dummy slot for wedding programmes
                      const weddingSlot: AvailabilitySlot = {
                        id: `wedding-${weddingDate}`,
                        date: weddingDate,
                        time: '10:00',
                        available: true,
                        duration: 60,
                        serviceId: 'wedding-programme',
                        locationId: 'wedding-programme'
                      }
                      // Create a dummy location for wedding programmes
                      const weddingLocation: ServiceLocation = {
                        id: 'wedding-programme',
                        name: 'Wedding Programme',
                        address: 'Harley Street Clinic',
                        city: 'London',
                        region: 'Greater London',
                        postalCode: 'W1G 6AX'
                      }
                      handleSlotSelect(weddingSlot, weddingLocation)
                    }
                  }}>
                    <div className="form-group">
                      <label className="form-label">Wedding Date</label>
                      <input 
                        type="date" 
                        name="weddingDate" 
                        className="form-input"
                        required
                        min={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} // Minimum 3 months from today
                        defaultValue={bookingData.appointment?.appointmentDate}
                      />
                      <p className="form-hint">Please select a date at least 3 months from today to allow for your transformation</p>
                    </div>
                    
                    <button type="submit" className="booking-button">CONTINUE TO PAYMENT</button>
                  </form>
                </div>
              ) : (
                <AvailabilitySelector
                  service={bookingData.service}
                  treatment={bookingData.treatment}
                  onSlotSelect={handleSlotSelect}
                  onPrevious={() => setCurrentStep('healthQuestions')}
                  selectedDate={bookingData.appointment?.appointmentDate}
                  selectedLocation={selectedLocation || undefined}
                />
              )}
            </>
          )}

          {currentStep === 'payment' && (
            <div className="booking-page">
              <button
                className="previous-button"
                onClick={() => {
                  // For weight management programmes, go back to photo upload
                  if (bookingData.treatment === 'glp1-weight' ||
                      bookingData.treatment === 'complete-weight' ||
                      bookingData.treatment === 'basic-weight') {
                    setCurrentStep('photoUpload')
                  } else if ((bookingData as any).isCustomPackage ||
                             bookingData.treatment === 'weight-consultation' ||
                             bookingData.treatment === 'consultation') {
                    setCurrentStep('healthQuestions')
                  } else {
                    setCurrentStep('dateTimeSelection')
                  }
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Previous
              </button>
              <h2 className="booking-title">Payment</h2>
              <p className="booking-subtitle">Complete your booking with secure payment.</p>
              
              <div className="booking-summary">
                <h3>Booking Summary</h3>
                <div className="summary-item">
                  <span>Service:</span>
                  <span>{bookingData.treatmentName}</span>
                </div>
                <div className="summary-item">
                  <span>Duration:</span>
                  <span>{bookingData.duration}</span>
                </div>
                {/* Only show date/time/location for services that need appointments */}
                {bookingData.service?.startsWith('wedding-') ? (
                  <div className="summary-item">
                    <span>Wedding Date:</span>
                    <span>{bookingData.appointment?.appointmentDate ? new Date(bookingData.appointment.appointmentDate).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Not selected'}</span>
                  </div>
                ) : (bookingData.treatment !== 'glp1-weight' &&
                       bookingData.treatment !== 'complete-weight' &&
                       bookingData.treatment !== 'basic-weight' &&
                       bookingData.treatment !== 'weight-consultation' &&
                       bookingData.treatment !== 'consultation') ? (
                  <>
                    <div className="summary-item">
                      <span>Date:</span>
                      <span>{bookingData.appointment?.appointmentDate ? new Date(bookingData.appointment.appointmentDate).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Not selected'}</span>
                    </div>
                    <div className="summary-item">
                      <span>Time:</span>
                      <span>{bookingData.appointment?.appointmentTime || 'Not selected'}</span>
                    </div>
                    <div className="summary-item">
                      <span>Location:</span>
                      <span>{bookingData.appointment?.location || selectedLocation?.name || 'Not selected'}</span>
                    </div>
                  </>
                ) : null}
                {discountInfo && (
                  <>
                    <div className="summary-item">
                      <span>Subtotal:</span>
                      <span>{typeof bookingData.price === 'number' ? `£${bookingData.price.toFixed(2)}` : bookingData.price}</span>
                    </div>
                    <div className="summary-item discount">
                      <span>Discount ({discountInfo.code}):</span>
                      <span>
                        -{discountInfo.percentOff ? `${discountInfo.percentOff}%` : 
                          discountInfo.amountOff ? `£${(discountInfo.amountOff / 100).toFixed(2)}` : 
                          `£${(((typeof bookingData.price === 'number'
                            ? bookingData.price * 100
                            : parseInt(bookingData.price?.replace(/[^0-9]/g, '') || '0') * 100) - discountInfo.finalAmount) / 100).toFixed(2)}`}
                      </span>
                    </div>
                  </>
                )}
                <div className="summary-item total">
                  <span>Total:</span>
                  <span>{discountInfo ? `£${(discountInfo.finalAmount / 100).toFixed(2)}` : (typeof bookingData.price === 'number' ? `£${bookingData.price.toFixed(2)}` : bookingData.price)}</span>
                </div>
              </div>
              
              {bookingData.price === 'FREE' || bookingData.price === 0 || (discountInfo && discountInfo.finalAmount === 0) ? (
                <button 
                  className="booking-button" 
                  onClick={async () => {
                    try {
                      await createBookingWithAPI()
                      setCurrentStep('confirmation')
                    } catch (error) {
                      console.error('Error processing free consultation:', error)
                      alert('An error occurred. Please try again.')
                    }
                  }}
                >
                  CONFIRM FREE CONSULTATION
                </button>
              ) : (
                <StripePaymentWithDiscount
                  amount={typeof bookingData.price === 'number'
                    ? bookingData.price * 100
                    : parseInt(bookingData.price?.replace(/[^0-9]/g, '') || '0') * 100}
                  bookingData={bookingData}
                  abandonedBookingId={abandonedBookingId}
                  onSuccess={async (paymentIntentId) => {
                    try {
                      await createBookingWithAPI(paymentIntentId)
                      setCurrentStep('confirmation')
                    } catch (err) {
                      console.error('Error confirming booking:', err)
                      alert('An error occurred. Please try again.')
                    }
                  }}
                  onError={(error) => {
                    console.error('Payment error:', error)
                    alert('Payment failed. Please try again.')
                  }}
                  onDiscountUpdate={(discount) => {
                    setDiscountInfo(discount)
                  }}
                />
              )}
            </div>
          )}

          {currentStep === 'confirmation' && (
            <div className="booking-page">
              <div className="booking-confirmation">
                <div className="confirmation-icon">✓</div>
                <h2 className="confirmation-title">Booking Confirmed!</h2>
                <p className="confirmation-message">
                  Thank you for booking with The Wellness. A member of our team will be in touch within 24 hours.
                </p>
                <button className="booking-button" onClick={handleClose}>CLOSE</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default BookingSidePanel