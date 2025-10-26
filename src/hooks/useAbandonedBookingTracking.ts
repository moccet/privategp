import { useEffect } from 'react';
import { saveAbandonedBooking, markBookingAsCompleted, BloodTestPackage } from '@/lib/abandonedBookings';

interface UseAbandonedBookingTrackingProps {
  paymentIntentId?: string;
  email?: string;
  bookingType?: string;
  packageType?: BloodTestPackage;
  amount?: number;
  currency?: string;
  customerDetails?: {
    name?: string;
    phone?: string;
  };
  isPaymentComplete?: boolean;
}

export function useAbandonedBookingTracking({
  paymentIntentId,
  email,
  bookingType = 'blood-test',
  packageType,
  amount = 0,
  currency = 'gbp',
  customerDetails,
  isPaymentComplete = false
}: UseAbandonedBookingTrackingProps) {
  
  // Save abandoned booking when payment intent is created
  useEffect(() => {
    if (paymentIntentId && email && !isPaymentComplete) {
      const saveBooking = async () => {
        try {
          await saveAbandonedBooking({
            paymentIntentId,
            email,
            bookingType,
            packageType,
            amount,
            currency,
            customerDetails
          });
        } catch (error) {
          console.error('Error saving abandoned booking:', error);
        }
      };
      
      saveBooking();
    }
  }, [paymentIntentId, email, bookingType, packageType, amount, currency, customerDetails]);
  
  // Mark booking as completed when payment succeeds
  useEffect(() => {
    if (paymentIntentId && isPaymentComplete) {
      const completeBooking = async () => {
        try {
          await markBookingAsCompleted(paymentIntentId);
        } catch (error) {
          console.error('Error marking booking as completed:', error);
        }
      };
      
      completeBooking();
    }
  }, [paymentIntentId, isPaymentComplete]);
}