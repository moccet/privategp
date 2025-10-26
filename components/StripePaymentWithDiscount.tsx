'use client'

import { useState, useEffect } from 'react'
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useAbandonedBookingTracking } from '@/hooks/useAbandonedBookingTracking'
import { updateAbandonedBookingWithPaymentIntent } from '@/lib/abandonedBookings'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

interface StripePaymentProps {
  amount: number
  bookingData: any
  abandonedBookingId?: string | null
  onSuccess: (paymentIntentId: string) => void
  onError: (error: string) => void
  onDiscountUpdate?: (discount: {
    code: string | null;
    percentOff?: number | null;
    amountOff?: number | null;
    finalAmount: number;
  } | null) => void
}

interface DiscountInfo {
  code: string
  percentOff?: number | null
  amountOff?: number | null
  name?: string | null
}

interface CheckoutFormProps extends StripePaymentProps {
  clientSecret: string
  onClientSecretUpdate: (secret: string) => void
  initialPaymentIntentId: string | null
}

function CheckoutForm({ amount, bookingData, onSuccess, onError, clientSecret, onClientSecretUpdate, onDiscountUpdate, initialPaymentIntentId }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [discountCode, setDiscountCode] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [discount, setDiscount] = useState<DiscountInfo | null>(null)
  const [finalAmount, setFinalAmount] = useState(amount)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(initialPaymentIntentId)

  const validateDiscountCode = async () => {
    if (!discountCode.trim()) {
      setMessage('Please enter a discount code')
      return
    }

    setIsValidating(true)
    setMessage(null)

    try {
      const response = await fetch('/api/stripe/validate-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: discountCode.trim(),
          amount
        }),
      })

      const data = await response.json()
      console.log('Discount validation response:', response.status, data)

      if (response.ok && data.valid) {
        setDiscount(data.coupon)
        setFinalAmount(data.finalAmount)
        setMessage(`Discount applied: ${data.coupon.name || discountCode}`)
        
        // Notify parent component about discount
        if (onDiscountUpdate) {
          onDiscountUpdate({
            code: discountCode,
            percentOff: data.coupon.percentOff,
            amountOff: data.coupon.amountOff,
            finalAmount: data.finalAmount
          })
        }
        
        // Update existing payment intent with discount
        await updatePaymentIntent(discountCode)
      } else {
        setMessage(data.error || 'Invalid discount code')
        setDiscount(null)
        setFinalAmount(amount)
      }
    } catch (error) {
      setMessage('Failed to validate discount code')
      console.error('Discount validation error:', error)
    } finally {
      setIsValidating(false)
    }
  }

  const removeDiscount = async () => {
    setDiscount(null)
    setDiscountCode('')
    setFinalAmount(amount)
    setMessage(null)
    
    // Notify parent component about discount removal
    if (onDiscountUpdate) {
      onDiscountUpdate(null)
    }
    
    // Update payment intent to remove discount
    await updatePaymentIntent()
  }

  const updatePaymentIntent = async (code?: string) => {
    if (!paymentIntentId) {
      // If no payment intent exists yet, we can't update
      return
    }

    try {
      const response = await fetch('/api/stripe/update-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId,
          amount,
          discountCode: code,
        }),
      })

      const data = await response.json()
      
      if (data.isFreeWithDiscount) {
        // Handle 100% discount case - no payment needed
        setPaymentIntentId(null)
        setFinalAmount(0)
      } else if (data.paymentIntentId) {
        setFinalAmount(data.finalAmount)
        // No need to update client secret - the payment intent is updated in place
      } else {
        onError('Failed to update payment')
      }
    } catch (error) {
      console.error('Error updating payment intent:', error)
      onError('Failed to update payment')
    }
  }

  const createPaymentIntent = async (code?: string) => {
    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          discountCode: code,
          metadata: {
            // Service details
            service: bookingData.service,
            treatment: bookingData.treatment,
            treatmentName: bookingData.treatmentName,
            treatmentType: bookingData.treatment?.toLowerCase().includes('blood') ? 'blood_test' : bookingData.service,
            price: bookingData.price,
            duration: bookingData.duration,
            
            // Customer details
            customerEmail: bookingData.personal.email || '',
            customerName: bookingData.personal.fullName || bookingData.personal.firstName || '',
            customerPhone: bookingData.personal.phone || '',
            customerDob: bookingData.personal.dob || '',
            customerGender: bookingData.personal.gender || '',
            
            // Address
            addressLine1: bookingData.personal.addressLine1 || '',
            addressLine2: bookingData.personal.addressLine2 || '',
            city: bookingData.personal.city || '',
            postalCode: bookingData.personal.postalCode || '',
            country: bookingData.personal.country || 'GB',
            
            // Appointment details
            appointmentDate: bookingData.appointment?.appointmentDate || '',
            appointmentTime: bookingData.appointment?.appointmentTime || '',
            startDateTime: bookingData.appointment?.startDateTime || '',
            endDateTime: bookingData.appointment?.endDateTime || '',
            locationId: bookingData.appointment?.locationId || '',
            locationName: bookingData.appointment?.locationName || '',
          },
        }),
      })

      const data = await response.json()
      
      if (data.isFreeWithDiscount) {
        // Handle 100% discount case - no payment needed
        setPaymentIntentId(null)
        setFinalAmount(0)
        // Don't update client secret for free orders
      } else if (data.clientSecret) {
        setPaymentIntentId(data.paymentIntentId)
        setFinalAmount(data.finalAmount)
        
        // Update parent component with new client secret
        onClientSecretUpdate(data.clientSecret)
      } else {
        onError('Failed to initialize payment')
      }
    } catch (error) {
      console.error('Error creating payment intent:', error)
      onError('Failed to initialize payment')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      console.error('Stripe or elements not loaded')
      return
    }

    setIsProcessing(true)
    setMessage(null)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking/confirmation`,
        },
        redirect: 'if_required',
      })

      if (error) {
        setMessage(error.message || 'An unexpected error occurred.')
        onError(error.message || 'Payment failed')
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id)
      }
    } catch (err) {
      console.error('Payment confirmation error:', err)
      setMessage('Payment failed. Please try again.')
      onError('Payment failed')
    }

    setIsProcessing(false)
  }

  const formatAmount = (amount: number) => {
    return `£${(amount / 100).toFixed(2)}`
  }

  const getDiscountDisplay = () => {
    if (!discount) return null

    if (discount.percentOff) {
      return `${discount.percentOff}% off`
    } else if (discount.amountOff) {
      return `£${(discount.amountOff / 100).toFixed(2)} off`
    }
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="stripe-payment-form">
      {/* Discount Code Section */}
      <div className="discount-section">
        <div className="discount-input-group">
          <input
            type="text"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            disabled={isValidating || discount !== null}
            className="discount-input"
          />
          {!discount ? (
            <button
              type="button"
              onClick={validateDiscountCode}
              disabled={isValidating || !discountCode.trim()}
              className="discount-apply-btn"
            >
              {isValidating ? 'Validating...' : 'Apply'}
            </button>
          ) : (
            <button
              type="button"
              onClick={removeDiscount}
              className="discount-remove-btn"
            >
              Remove
            </button>
          )}
        </div>
        
        {discount && (
          <div className="discount-applied">
            <span className="discount-badge">
              {discount.name || discountCode} - {getDiscountDisplay()}
            </span>
          </div>
        )}
      </div>

      {/* Price Summary */}
      <div className="price-summary">
        <div className="price-line">
          <span>Subtotal:</span>
          <span>{formatAmount(amount)}</span>
        </div>
        {discount && (
          <div className="price-line discount">
            <span>Discount:</span>
            <span>-{formatAmount(amount - finalAmount)}</span>
          </div>
        )}
        <div className="price-line total">
          <span>Total:</span>
          <span className="total-amount">{formatAmount(finalAmount)}</span>
        </div>
      </div>

      {finalAmount > 0 ? (
        <>
          <PaymentElement 
            className="payment-element" 
            options={{
              layout: 'tabs',
              defaultValues: {
                billingDetails: {
                  email: bookingData.personal.email || '',
                  name: bookingData.personal.firstName || '',
                }
              }
            }}
          />
          
          {message && (
            <div className={`payment-message ${message.includes('applied') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isProcessing || !stripe || !elements}
            className="payment-submit-button"
          >
            {isProcessing ? 'Processing...' : `Pay ${formatAmount(finalAmount)}`}
          </button>
        </>
      ) : (
        <>
          <div className="free-booking-message">
            <p>Your booking is FREE with the discount code!</p>
          </div>
          
          {message && (
            <div className={`payment-message ${message.includes('applied') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
          
          <button
            type="button"
            onClick={() => onSuccess('')}
            disabled={isProcessing}
            className="payment-submit-button"
          >
            {isProcessing ? 'Processing...' : 'CONFIRM FREE BOOKING'}
          </button>
        </>
      )}
    </form>
  )
}

export default function StripePaymentWithDiscount({ amount, bookingData, abandonedBookingId, onSuccess, onError, onDiscountUpdate }: StripePaymentProps) {
  const [clientSecret, setClientSecret] = useState('')
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPaymentComplete, setIsPaymentComplete] = useState(false)
  
  // Track abandoned bookings
  useAbandonedBookingTracking({
    paymentIntentId: paymentIntentId || undefined,
    email: bookingData.personal.email,
    bookingType: bookingData.service,
    amount: amount,
    currency: 'gbp',
    customerDetails: {
      name: bookingData.personal.fullName || bookingData.personal.firstName || '',
      phone: bookingData.personal.phone || ''
    },
    isPaymentComplete: isPaymentComplete
  })

  const createInitialPaymentIntent = async () => {
    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          metadata: {
            service: bookingData.service,
            treatment: bookingData.treatment,
            treatmentType: bookingData.treatment?.toLowerCase().includes('blood') ? 'blood_test' : bookingData.service,
            customerEmail: bookingData.personal.email || '',
            customerName: bookingData.personal.fullName || bookingData.personal.firstName || '',
            appointmentDate: bookingData.appointment?.appointmentDate || '',
            appointmentTime: bookingData.appointment?.appointmentTime || '',
            startDateTime: bookingData.appointment?.startDateTime || '',
            endDateTime: bookingData.appointment?.endDateTime || '',
          },
        }),
      })

      const data = await response.json()
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret)
        setPaymentIntentId(data.paymentIntentId)
        
        // Update abandoned booking with payment intent if we have an early capture
        if (abandonedBookingId && data.paymentIntentId) {
          try {
            await updateAbandonedBookingWithPaymentIntent({
              email: bookingData.personal.email,
              paymentIntentId: data.paymentIntentId,
              amount: amount,
              abandonedBookingId: abandonedBookingId
            })
            console.log('Updated abandoned booking with payment intent')
          } catch (error) {
            console.error('Failed to update abandoned booking:', error)
            // Don't block payment flow if this fails
          }
        }
      } else {
        console.error('No client secret received:', data)
        onError(data.error || 'Failed to initialize payment')
      }
    } catch (err) {
      console.error('Error creating payment intent:', err)
      onError('Failed to initialize payment')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    createInitialPaymentIntent()
  }, []) // Only run once on mount

  // Add a retry mechanism if payment fails due to expired intent
  const handlePaymentError = (error: string) => {
    if (error.includes('expired') || error.includes('400')) {
      console.log('Payment intent expired, creating new one...')
      createInitialPaymentIntent()
    }
    onError(error)
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#000000',
      colorBackground: '#ffffff',
      colorText: '#000000',
      colorDanger: '#df1b41',
      fontFamily: 'system-ui, sans-serif',
      borderRadius: '8px',
    },
  }

  const options = {
    clientSecret,
    appearance,
  }

  if (!stripePromise) {
    return (
      <div className="stripe-payment-container">
        <div className="stripe-error">
          <p>Payment processing is not configured.</p>
          <p className="error-details">Please contact support to complete your booking.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="stripe-payment-container">
        <div className="payment-loading">
          <p>Initializing secure payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="stripe-payment-container">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise} key={clientSecret}>
          <CheckoutForm
            amount={amount}
            bookingData={bookingData}
            onSuccess={(paymentIntentId) => {
              setIsPaymentComplete(true)
              onSuccess(paymentIntentId)
            }}
            onError={handlePaymentError}
            clientSecret={clientSecret}
            onClientSecretUpdate={(newSecret) => {
              setClientSecret(newSecret)
            }}
            onDiscountUpdate={onDiscountUpdate}
            initialPaymentIntentId={paymentIntentId}
          />
        </Elements>
      ) : (
        <div className="stripe-error">
          <p>Unable to initialize payment. Please refresh and try again.</p>
          <button onClick={() => {
            setIsLoading(true)
            createInitialPaymentIntent()
          }} className="retry-button">
            Retry
          </button>
        </div>
      )}
    </div>
  )
}