// API client for the Clinic Booking Platform
export interface AvailabilityRequest {
  serviceId: string;
  locationId?: string;
  date?: string;
  region?: string;
}

export interface AvailabilitySlot {
  id: string;
  date: string;
  time: string;
  duration: number;
  available: boolean;
  serviceId: string;
  locationId: string;
}

export interface ServiceLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
}

export interface BookingService {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  region: string;
  addOns?: ServiceAddOn[];
}

export interface ServiceAddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface CreateBookingRequest {
  serviceId: string;
  locationId: string;
  availabilityId: string;
  patientDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      postalCode: string;
      country: string;
    };
  };
  addOnIds?: string[];
  notes?: string;
}

export interface BookingResponse {
  id: string;
  referenceNumber: string;
  status: string;
  serviceId: string;
  locationId: string;
  appointmentDate: string;
  appointmentTime: string;
  duration: number;
  price: number;
  patientDetails: any;
  addOns?: ServiceAddOn[];
}

export interface HoldAvailabilityRequest {
  availabilityId: string;
  holdDurationMinutes?: number;
}

export interface RescheduleRequest {
  bookingId: string;
  newAvailabilityId: string;
}

const API_BASE_URL = 'https://stes-clinic-booking-platform-api.azurewebsites.net/booking-platform-api';

export class BookingPlatformAPI {
  private apiKey?: string;
  private authToken?: string;

  constructor() {
    // Try to get credentials from environment variables
    this.apiKey = process.env.NEXT_PUBLIC_BOOKING_API_KEY || process.env.BOOKING_API_KEY;
    this.authToken = process.env.NEXT_PUBLIC_BOOKING_AUTH_TOKEN || process.env.BOOKING_AUTH_TOKEN;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  private async makeRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' = 'GET', 
    body?: any
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Try different authentication methods
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    } else if (this.apiKey) {
      // Try different API key header patterns
      headers['X-API-Key'] = this.apiKey;
      headers['ApiKey'] = this.apiKey;
      headers['Ocp-Apim-Subscription-Key'] = this.apiKey; // Common for Azure API Management
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && method === 'POST') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      let errorMessage = `API request failed: ${response.status} ${response.statusText}`;
      
      if (response.status === 401) {
        errorMessage += '\n\nAuthentication required. Please check API credentials.';
        console.error('Authentication failed. Check if API key or token is required for:', url);
      }
      
      // Try to get more error details from response
      try {
        const errorData = await response.text();
        if (errorData) {
          console.error('API Error Details:', errorData);
        }
      } catch (e) {
        // Ignore if we can't parse error details
      }
      
      throw new Error(errorMessage);
    }

    return response.json();
  }

  // Get available regions
  async getServiceRegions(): Promise<string[]> {
    return this.makeRequest('/RandoxServices/GetServiceRegions');
  }

  // Get service categories
  async getServiceCategories(): Promise<string[]> {
    return this.makeRequest('/RandoxServices/GetServiceCategories');
  }

  // Get services and add-ons
  async getServicesAndAddOns(request: { region?: string; category?: string }): Promise<{
    services: BookingService[];
    addOns: ServiceAddOn[];
  }> {
    return this.makeRequest('/RandoxServices/GetServicesAndAddons', 'POST', request);
  }

  // Get location regions
  async getLocationRegions(): Promise<string[]> {
    return this.makeRequest('/Locations/GetLocationRegions');
  }

  // Get service locations
  async getServiceLocations(request: { region?: string; serviceId?: string }): Promise<ServiceLocation[]> {
    return this.makeRequest('/Locations/GetServiceLocations', 'POST', request);
  }

  // Get biological sex options
  async getBiologicalSex(): Promise<Array<{ id: string; name: string }>> {
    return this.makeRequest('/BiologicalSex/GetBiologicalSex');
  }

  // Check availability
  async getAvailability(request: AvailabilityRequest): Promise<AvailabilitySlot[]> {
    return this.makeRequest('/Availability/Availability', 'POST', request);
  }

  // Get detailed availability
  async getAvailabilityDetails(request: AvailabilityRequest): Promise<any> {
    return this.makeRequest('/Availability/AvailabilityDetails', 'POST', request);
  }

  // Hold availability slot
  async holdAvailability(request: HoldAvailabilityRequest): Promise<{
    holdId: string;
    expiresAt: string;
  }> {
    return this.makeRequest('/RandoxBookings/HoldAvailabilityBooking', 'POST', request);
  }

  // Create booking
  async createBooking(request: CreateBookingRequest): Promise<BookingResponse> {
    return this.makeRequest('/RandoxBookings/CreateRandoxBooking', 'POST', request);
  }

  // Cancel booking
  async cancelBooking(bookingId: string, reason?: string): Promise<{ success: boolean }> {
    return this.makeRequest('/RandoxBookings/CancelRandoxBooking', 'POST', {
      bookingId,
      cancellationReason: reason
    });
  }

  // Reschedule booking
  async rescheduleBooking(request: RescheduleRequest): Promise<BookingResponse> {
    return this.makeRequest('/RandoxBookings/RescheduleAppointment', 'POST', request);
  }

  // Get booking appointments (dashboard)
  async getBookingAppointments(request: {
    patientEmail?: string;
    patientPhone?: string;
    bookingReference?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<BookingResponse[]> {
    return this.makeRequest('/Dashboard/ReadBookingAppointments', 'POST', request);
  }

  // Search booking appointments
  async searchBookingAppointments(request: {
    searchTerm: string;
    searchType: 'email' | 'phone' | 'reference';
    startDate?: string;
    endDate?: string;
  }): Promise<BookingResponse[]> {
    return this.makeRequest('/Dashboard/ReadBookingAppointmentSearch', 'POST', request);
  }
}

// Export singleton instance
export const bookingAPI = new BookingPlatformAPI();

// Helper function to map our internal service codes to API service IDs
export const mapServiceToAPIService = (internalService: string, treatment: string): string => {
  // This mapping will need to be configured based on your actual service offerings
  // and how they correspond to the API's service IDs
  const serviceMapping: Record<string, Record<string, string>> = {
    'blood-tests': {
      'basic-panel': 'randox-basic-blood-panel',
      'comprehensive': 'randox-comprehensive-panel',
      'wellness-check': 'randox-wellness-check'
    },
    'health-consultations': {
      'free-consultation': 'randox-consultation-free',
      'detailed-consultation': 'randox-consultation-detailed'
    }
    // Add more mappings as needed
  };

  return serviceMapping[internalService]?.[treatment] || 'default-service-id';
};

// Helper function to map API gender options to our form values
export const mapGenderToAPI = (gender: string): string => {
  const genderMapping: Record<string, string> = {
    'male': 'Male',
    'female': 'Female',
    'other': 'Other',
    'prefer-not-to-say': 'Prefer not to say'
  };
  
  return genderMapping[gender] || gender;
};