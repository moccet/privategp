// Mock implementation for order API

export interface TestItem {
  id: string;
  name: string;
  description: string;
  category: string;
  sampleType: string;
  turnaroundTime: string;
  price: number;
}

export interface OrderStatus {
  orderId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  statusMessage: string;
  estimatedCompletionDate?: string;
  actualCompletionDate?: string;
}

export interface OrderResult {
  orderId: string;
  testId: string;
  testName: string;
  result: {
    status: 'normal' | 'abnormal' | 'critical' | 'pending';
    value?: number | string;
    unit?: string;
    referenceRange?: string;
    flags: string[];
  };
  resultDate: string;
  reviewStatus: 'pending_review' | 'approved_for_release' | 'requires_followup';
}

export interface OrderResultReport {
  orderId: string;
  reportId: string;
  reportType: 'preliminary' | 'final' | 'amended';
  generatedDate: string;
  reviewStatus: 'pending_review' | 'approved_for_release' | 'requires_followup';
  reviewedBy?: string;
  reviewDate?: string;
  results: OrderResult[];
  summary?: string;
  recommendations?: string;
}

export const canShowResultsToPatient = (report: OrderResultReport): boolean => {
  return report.reviewStatus === 'approved_for_release';
};

export const getResultStatusDisplay = (report: OrderResultReport) => {
  switch (report.reviewStatus) {
    case 'approved_for_release':
      return { status: 'Available', message: 'Results reviewed and ready to view', color: '#10b981' };
    case 'pending_review':
      return { status: 'Under Review', message: 'Results are being reviewed by our medical team', color: '#f59e0b' };
    case 'requires_followup':
      return { status: 'Follow-up Required', message: 'Please contact us to discuss your results', color: '#dc2626' };
    default:
      return { status: 'Processing', message: 'Results are being processed', color: '#6b7280' };
  }
};

// Mock API functions
export const orderAPI = {
  async getTestItems(): Promise<TestItem[]> {
    // Mock test items
    return [
      {
        id: 'CBC',
        name: 'Complete Blood Count',
        description: 'Full blood count including white cells, red cells, and platelets',
        category: 'Hematology',
        sampleType: 'Blood',
        turnaroundTime: '24 hours',
        price: 45
      },
      {
        id: 'LIPID',
        name: 'Lipid Profile',
        description: 'Cholesterol, HDL, LDL, and triglycerides',
        category: 'Chemistry',
        sampleType: 'Blood',
        turnaroundTime: '24 hours',
        price: 35
      },
      {
        id: 'THYROID',
        name: 'Thyroid Function Panel',
        description: 'TSH, T3, T4 levels',
        category: 'Endocrinology',
        sampleType: 'Blood',
        turnaroundTime: '48 hours',
        price: 60
      }
    ];
  },

  async getTestReasons(): Promise<{ id: string; name: string }[]> {
    return [
      { id: 'ROUTINE', name: 'Routine Health Check' },
      { id: 'SYMPTOMS', name: 'Investigation of Symptoms' },
      { id: 'FOLLOWUP', name: 'Follow-up Testing' }
    ];
  },

  async getOrderStatus(orderId: string): Promise<OrderStatus> {
    // Mock status based on order ID
    const mockStatuses: Record<string, OrderStatus> = {
      'ORDER-2024-001': {
        orderId: 'ORDER-2024-001',
        status: 'completed',
        statusMessage: 'Results ready for review',
        actualCompletionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      'ORDER-2024-002': {
        orderId: 'ORDER-2024-002',
        status: 'in_progress',
        statusMessage: 'Sample being processed',
        estimatedCompletionDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    };
    
    return mockStatuses[orderId] || {
      orderId,
      status: 'pending',
      statusMessage: 'Order received and being processed'
    };
  },

  async getOrderResultReports(orderId: string): Promise<OrderResultReport[]> {
    // Mock reports based on order ID
    const mockReports: Record<string, OrderResultReport[]> = {
      'ORDER-2024-001': [
        {
          orderId: 'ORDER-2024-001',
          reportId: 'RPT-001',
          reportType: 'final',
          generatedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          reviewStatus: 'approved_for_release',
          reviewedBy: 'Dr. Smith',
          reviewDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          results: [
            {
              orderId: 'ORDER-2024-001',
              testId: 'CBC',
              testName: 'Complete Blood Count',
              result: {
                status: 'normal',
                flags: []
              },
              resultDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              reviewStatus: 'approved_for_release'
            }
          ],
          summary: 'All blood parameters within normal limits.',
          recommendations: 'Continue with regular health maintenance.'
        }
      ],
      'ORDER-2024-002': [
        {
          orderId: 'ORDER-2024-002',
          reportId: 'RPT-002',
          reportType: 'preliminary',
          generatedDate: new Date().toISOString(),
          reviewStatus: 'pending_review',
          results: [],
          summary: 'Results pending medical review.'
        }
      ]
    };
    
    return mockReports[orderId] || [];
  },

  async createOrder(orderRequest: any): Promise<{ orderId: string }> {
    // Mock order creation
    const orderId = `TWB-ORDER-${Date.now()}`;
    console.log('Mock order created:', orderId, orderRequest);
    return { orderId };
  }
};

// Helper function for mapping booking data to patient info
export const mapBookingToPatientInfo = (bookingData: any, userId: string) => {
  return {
    userId,
    firstName: bookingData.personal?.fullName?.split(' ')[0] || '',
    lastName: bookingData.personal?.fullName?.split(' ').slice(1).join(' ') || '',
    email: bookingData.personal?.email || '',
    phone: bookingData.personal?.phone || '',
    dateOfBirth: bookingData.personal?.dob || '',
    gender: bookingData.personal?.gender || '',
    address: {
      line1: bookingData.personal?.addressLine1 || '',
      line2: bookingData.personal?.addressLine2 || '',
      city: bookingData.personal?.city || '',
      postalCode: bookingData.personal?.postalCode || '',
      country: bookingData.personal?.country || 'UK'
    }
  };
};