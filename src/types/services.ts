export interface ServiceOption {
  code: string
  name: string
  price: string
  originalPrice?: string
  desc: string
  duration: string
  tag: string
}

export interface ServiceData {
  title: string
  subtitle: string
  options: ServiceOption[]
}

export interface BookingData {
  service: string | null
  treatment: string | null
  treatmentName: string | null
  price: string | number | null
  duration: string | null
  personal: Record<string, any>
  health: Record<string, any>
  appointment: Record<string, any>
  payment: Record<string, any>
  photos?: Record<string, any>
  isCustomPackage?: boolean
  customPackageData?: {
    id: string
    title: string
    price: number
    description?: string
    features?: string[]
  }
}

export interface Service {
  id: string
  title: string
  description: string
  duration: string
  type: string
  image?: string
}